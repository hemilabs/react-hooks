import { useQueryClient } from "@tanstack/react-query";
import { type GetBalanceReturnType } from "@wagmi/core";
import { useCallback } from "react";
import type { Chain, TransactionReceipt } from "viem";

import { useNativeBalance } from "./useNativeBalance";

/**
 * Returns a function that updates the native token balance after a transaction receipt.
 * Subtracts gas costs and optional amount from the cached balance.
 */
export const useUpdateNativeBalanceAfterReceipt = function (
  chainId: Chain["id"],
) {
  const queryClient = useQueryClient();

  const { queryKey: nativeTokenBalanceQueryKey } = useNativeBalance(chainId);

  return useCallback(
    (
      { effectiveGasPrice, gasUsed }: TransactionReceipt,
      amount: bigint = BigInt(0),
    ) =>
      queryClient.setQueryData(
        nativeTokenBalanceQueryKey,
        (old: GetBalanceReturnType) => ({
          ...old,
          value: old.value - effectiveGasPrice * gasUsed - amount,
        }),
      ),
    [queryClient, nativeTokenBalanceQueryKey],
  );
};
