import { type Chain } from "viem";
import { useAccount, useBalance } from "wagmi";

/**
 * Fetches the native token balance for the connected account on a specific chain.
 */
export const useNativeBalance = (chainId: Chain["id"]) =>
  useBalance({
    address: useAccount().address,
    chainId,
  });
