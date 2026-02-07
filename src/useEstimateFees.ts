import { parseEther } from "viem/utils";
import { useEstimateMaxPriorityFeePerGas, useFeeHistory } from "wagmi";

import { estimateTotalFee } from "./utils/fees";

const defaultBlockCount = 4;
const defaultOverEstimation = 1.5;
const defaultFallbackPriorityFee = parseEther("1", "gwei");

type UseEstimateFees = {
  chainId: number;
  isGasUnitsError?: boolean;
  overEstimation?: number;
  gasUnits?: bigint;
  fallbackPriorityFee?: bigint;
};

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
  const { data: feeHistory, isError: isFeeHistoryError } = useFeeHistory({
    blockCount: defaultBlockCount,
    blockTag: "latest",
    chainId,
    query: {
      enabled: gasUnits !== undefined,
      // re-estimate every 5 blocks approximately
      refetchInterval: 60 * 1000,
    },
    rewardPercentiles: [30],
  });

  const { data: maxPriorityFeePerGas, isError: isMaxPriorityFeePerGasError } =
    useEstimateMaxPriorityFeePerGas({ chainId });

  // Use the base fee from the latest block in the fee history.
  // This value is in wei and reflects the current network congestion.
  const baseFeePerGas = feeHistory?.baseFeePerGas?.at(-1);

  const fees = estimateTotalFee({
    baseFeePerGas,
    fallbackPriorityFee,
    gasUnits,
    maxPriorityFeePerGas,
    overEstimation,
  });

  return {
    fees,
    isError:
      isGasUnitsError || isFeeHistoryError || isMaxPriorityFeePerGasError,
  };
}
