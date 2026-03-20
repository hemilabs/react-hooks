import {
  queryOptions,
  useQuery,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import type { Config } from "@wagmi/core";
import {
  estimateMaxPriorityFeePerGasQueryOptions,
  getFeeHistoryQueryOptions,
} from "@wagmi/core/query";
import { parseEther } from "viem/utils";
import { useConfig } from "wagmi";

import { estimateTotalFee } from "./utils/fees";

const defaultBlockCount = 4;
const defaultOverEstimation = 1.5;
const defaultFallbackPriorityFee = parseEther("1", "gwei");

type EstimateFeesParameters = {
  chainId: number;
  gasUnits?: bigint;
  overEstimation?: number;
  fallbackPriorityFee?: bigint;
};

type EstimateFeesQueryOptionsParameters = EstimateFeesParameters & {
  config: Config;
  queryClient: QueryClient;
};

type UseEstimateFees = EstimateFeesParameters & {
  isGasUnitsError?: boolean;
};

/**
 * Generates a query key for the estimate fees query.
 */
const estimateFeesQueryKey = ({
  chainId,
  fallbackPriorityFee = defaultFallbackPriorityFee,
  gasUnits,
  overEstimation = defaultOverEstimation,
}: EstimateFeesParameters) =>
  [
    "estimateFees",
    chainId,
    gasUnits?.toString(),
    overEstimation,
    fallbackPriorityFee?.toString(),
  ] as const;

/**
 * Generates query options for the estimate fees query.
 * Can be used with `queryClient.ensureQueryData` or `queryClient.fetchQuery` outside of React.
 */
export const estimateFeesQueryOptions = ({
  chainId,
  config,
  fallbackPriorityFee = defaultFallbackPriorityFee,
  gasUnits,
  overEstimation = defaultOverEstimation,
  queryClient,
}: EstimateFeesQueryOptionsParameters) =>
  queryOptions({
    enabled: gasUnits !== undefined,
    async queryFn() {
      const [feeHistory, maxPriorityFeePerGas] = await Promise.all([
        queryClient.ensureQueryData(
          getFeeHistoryQueryOptions(config, {
            blockCount: defaultBlockCount,
            blockTag: "latest",
            chainId,
            rewardPercentiles: [30],
          }),
        ),
        queryClient.ensureQueryData(
          estimateMaxPriorityFeePerGasQueryOptions(config, { chainId }),
        ),
      ]);

      // Use the base fee from the latest block in the fee history.
      // This value is in wei and reflects the current network congestion.
      const baseFeePerGas = feeHistory?.baseFeePerGas?.at(-1);

      return estimateTotalFee({
        baseFeePerGas,
        fallbackPriorityFee,
        gasUnits,
        maxPriorityFeePerGas,
        overEstimation,
      });
    },
    queryKey: estimateFeesQueryKey({
      chainId,
      fallbackPriorityFee,
      gasUnits,
      overEstimation,
    }),
    // re-estimate every 5 blocks approximately
    refetchInterval: 60 * 1000,
  });

/**
 * Custom hook to estimate the total transaction fee for an EIP-1559 compatible network.
 *
 * It uses recent base fee history and a suggested or fallback maxPriorityFeePerGas to
 * calculate a conservative `maxFeePerGas`, and multiplies it by the estimated gas units.
 * This hook supports a custom `overEstimation` factor to pad the result for safety.
 *
 * @param {Object} params - Hook parameters.
 * @param {number} params.chainId - The chain ID of the target network.
 * @param {bigint | undefined} params.gasUnits - Estimated gas units for the transaction.
 * @param {boolean} [params.isGasUnitsError=false] - Whether there was an error in estimating gas units.
 * @param {number} [params.overEstimation=1.5] - Optional multiplier to pad the estimated fee for safety.
 * @param {bigint} [params.fallbackPriorityFee=1000000000n] - Fallback priority fee in wei to use when maxPriorityFeePerGas is unavailable or too low.
 *
 * @returns {Object} Result object.
 * @returns {bigint | undefined} result.fees - Estimated total fee in wei.
 * @returns {boolean} result.isError - Indicates whether there was a gas estimation error.
 */
export function useEstimateFees({
  chainId,
  fallbackPriorityFee = defaultFallbackPriorityFee,
  gasUnits,
  isGasUnitsError = false,
  overEstimation = defaultOverEstimation,
}: UseEstimateFees) {
  const config = useConfig();
  const queryClient = useQueryClient();

  const { data: fees, isError } = useQuery(
    estimateFeesQueryOptions({
      chainId,
      config,
      fallbackPriorityFee,
      gasUnits,
      overEstimation,
      queryClient,
    }),
  );

  return {
    fees,
    isError: isGasUnitsError || isError,
  };
}
