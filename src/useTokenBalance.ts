import { queryOptions, useQuery } from "@tanstack/react-query";
import { type Address, type Chain, type Client, isAddress } from "viem";
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
 * Generates query options for the token balance query.
 * Can be used with `queryClient.ensureQueryData` to read from cache.
 */
export const tokenBalanceQueryOptions = ({
  account,
  client,
  token,
}: {
  account: Address;
  client: Client;
  token: TokenBalanceParams;
}) =>
  queryOptions({
    enabled: isAddress(account) && isAddress(token.address) && !!client,
    queryFn: () =>
      balanceOf(client, {
        account,
        address: token.address,
      }),
    queryKey: tokenBalanceQueryKey(token, account),
  });

/**
 * Fetches the ERC20 token balance for the connected account.
 */
export const useTokenBalance = function (token: TokenBalanceParams) {
  const { address: account } = useAccount();
  const publicClient = usePublicClient({ chainId: token.chainId });

  return useQuery(
    tokenBalanceQueryOptions({
      account: account!,
      client: publicClient!,
      token,
    }),
  );
};
