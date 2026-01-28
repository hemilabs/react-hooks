import { useAccount, useSwitchChain } from "wagmi";
import { type Chain } from "viem";

/**
 * Returns a function that ensures the wallet is connected to a specific chain.
 * Throws an error if no account is connected or switches chains if needed.
 */
export const useEnsureConnectedTo = function () {
  const { switchChainAsync } = useSwitchChain();
  const { address: evmAddress, chainId: evmChainId } = useAccount();

  return async function ensureConnectedTo(targetChainId: Chain["id"]) {
    if (!evmAddress) {
      throw new Error("No EVM account connected");
    }
    if (evmChainId !== targetChainId) {
      await switchChainAsync({ chainId: targetChainId });
    }
    return;
  };
};
