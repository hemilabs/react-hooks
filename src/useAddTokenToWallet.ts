import { useMutation } from "@tanstack/react-query";
import { type Address, type Chain } from "viem";
import { useAccount, useWalletClient } from "wagmi";
import watchAsset from "wallet-watch-asset";

import { useEnsureConnectedTo } from "./useEnsureConnectedTo";

type Token = {
  address: Address;
  chainId: Chain["id"];
  extensions?: {
    logoURI?: string;
  };
};

type Options = {
  token: Token;
};

/**
 * Provides a mutation to add a token to the user's wallet.
 * Ensures the wallet is connected to the correct chain before adding.
 */
export const useAddTokenToWallet = function (options: Options) {
  const { address } = useAccount();
  const ensureConnectedTo = useEnsureConnectedTo();
  const { data: walletClient } = useWalletClient({
    chainId: options.token.chainId,
  });

  return useMutation({
    async mutationFn() {
      const { token } = options;

      await ensureConnectedTo(options.token.chainId);

      return watchAsset(
        // @ts-expect-error walletClient is a different type, but it matches the Provider interface
        walletClient,
        address,
        {
          address: token.address,
          chainId: token.chainId,
          logoURI: token.extensions?.logoURI,
        },
        localStorage,
      );
    },
  });
};
