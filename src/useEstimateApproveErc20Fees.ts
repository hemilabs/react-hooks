import { type Address, type Chain, encodeFunctionData, erc20Abi } from "viem";
import { useEstimateGas } from "wagmi";

import { useEstimateFees } from "./useEstimateFees";

export const useEstimateApproveErc20Fees = function ({
  amount,
  enabled = true,
  spender,
  token,
}: {
  amount: bigint;
  enabled?: boolean;
  spender: Address;
  token: { address: Address; chainId: Chain["id"] };
}) {
  const { data: gasUnits, isError } = useEstimateGas({
    chainId: token.chainId,
    data: encodeFunctionData({
      abi: erc20Abi,
      args: [spender, amount],
      functionName: "approve",
    }),
    query: { enabled: enabled && amount > BigInt(0) },
    to: token.address,
  });

  return useEstimateFees({
    chainId: token.chainId,
    gasUnits,
    isGasUnitsError: isError,
  });
};
