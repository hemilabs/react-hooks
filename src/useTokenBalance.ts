import { useQuery } from "@tanstack/react-query";
import { type Address, type Chain, isAddress } from "viem";
import { balanceOf } from "viem-erc20/actions";
import { useAccount, usePublicClient } from "wagmi";

type TokenBalanceParams = {
  address: Address;
  chainId: Chain["id"];
};

/**
 * Generates a query key for the token balance query.
 */
export const tokenBalanceQueryKey = (
  token: TokenBalanceParams,
  account: Address | undefined,
) => ["tokenBalance", token.chainId, token.address, account] as const;

/**
 * Fetches the ERC20 token balance for the connected account.
 */
export const useTokenBalance = function (token: TokenBalanceParams) {
  const { address: account } = useAccount();
  const publicClient = usePublicClient({ chainId: token.chainId });

  return useQuery({
    enabled:
      !!account &&
      isAddress(account) &&
      isAddress(token.address) &&
      !!publicClient,
    queryFn: () =>
      balanceOf(publicClient!, {
        account: account!,
        address: token.address,
      }),
    queryKey: tokenBalanceQueryKey(token, account),
  });
};
