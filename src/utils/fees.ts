import { parseEther } from "viem/utils";

const DEFAULT_FEE_MULTIPLIER = 2;
const DEFAULT_OVER_ESTIMATION = 1.5;
const DEFAULT_FALLBACK_PRIORITY_FEE = parseEther("1", "gwei");

export type EstimateTotalFeeParams = {
  baseFeePerGas: bigint | undefined;
  maxPriorityFeePerGas: bigint | undefined;
  gasUnits?: bigint;
  overEstimation?: number;
  fallbackPriorityFee?: bigint;
};

/**
 * Estimates the total transaction fee for an EIP-1559 compatible network.
 *
 * It uses the base fee and a suggested or fallback maxPriorityFeePerGas to
 * calculate a conservative `maxFeePerGas`, and multiplies it by the estimated gas units.
 * This function supports a custom `overEstimation` factor to pad the result for safety.
 *
 * This implementation is based on
 * See https://github.com/hemilabs/ui-monorepo/blob/694c9fd0e5e8d8deee8f99e7ee5e6d7783020e0e/portal/hooks/useEstimateFees.ts#L56
 *
 * @param params - Function parameters.
 * @param params.baseFeePerGas - The base fee per gas from the latest block (in wei).
 * @param params.maxPriorityFeePerGas - The suggested priority fee per gas (in wei), or undefined if unavailable.
 * @param params.gasUnits - Estimated gas units for the transaction, or undefined if unavailable.
 * @param params.overEstimation - Optional multiplier to pad the estimated fee for safety.
 * @param params.fallbackPriorityFee - Fallback priority fee in wei to use when maxPriorityFeePerGas is unavailable or too low.
 *
 * @returns {bigint | undefined} Estimated total fee in wei, or undefined if required values are not yet loaded.
 */
export function estimateTotalFee({
  baseFeePerGas,
  fallbackPriorityFee = DEFAULT_FALLBACK_PRIORITY_FEE,
  gasUnits,
  maxPriorityFeePerGas,
  overEstimation = DEFAULT_OVER_ESTIMATION,
}: EstimateTotalFeeParams) {
  // If gas units or base fee are not available, return undefined as we cannot estimate the total fee.
  if (gasUnits === undefined || baseFeePerGas === undefined) {
    return undefined;
  }

  // Convert the suggested priority fee (in wei) to a BigInt.
  // If not available, fallback to zero for now and correct below.
  const rawPriorityFeeWei = maxPriorityFeePerGas ?? 0n;

  // Use the estimated priority fee if it's above the fallback,
  // otherwise use the fallback to avoid underestimating the fee.
  const safePriorityFeeWei =
    rawPriorityFeeWei > fallbackPriorityFee
      ? rawPriorityFeeWei
      : fallbackPriorityFee;

  // Calculate the maxFeePerGas using EIP-1559 strategy:
  // maxFeePerGas = baseFee * multiplier + priorityFee
  const maxFeePerGasWei =
    baseFeePerGas * BigInt(DEFAULT_FEE_MULTIPLIER) + safePriorityFeeWei;

  // Estimate the total fee by multiplying gas units by the max fee per gas,
  // and applying an overestimation multiplier (typically 1.0 or 1.5 for safety).
  const overEstimationNumerator = BigInt(Math.round(overEstimation * 1000));
  const overEstimationDenominator = 1000n;
  const totalFeeEstimate =
    (gasUnits * maxFeePerGasWei * overEstimationNumerator) /
    overEstimationDenominator;

  return totalFeeEstimate;
}
