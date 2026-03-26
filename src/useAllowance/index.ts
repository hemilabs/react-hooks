import { queryOptions, useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, DefaultError } from "@tanstack/react-query";
import { isAddress, type Address, type Chain, type Client } from "viem";
import { allowance } from "viem-erc20/actions";
import { usePublicClient } from "wagmi";

type UseAllowanceParameters<TData = bigint> = {
  owner: Address | undefined;
  spender: Address | undefined;
  query?: Omit<
    UseQueryOptions<bigint, DefaultError, TData>,
    "queryFn" | "queryKey" | "enabled"
  >;
  token: {
    address: Address;
    chainId: Chain["id"];
  };
};

/**
 * Generates a query key for the allowance query.
 */
export const allowanceQueryKey = ({
  owner,
  spender,
  token,
}: Omit<UseAllowanceParameters<unknown>, "query">) =>
  ["allowance", token.chainId, token.address, owner, spender] as const;

/**
 * Generates query options for the allowance query.
 * Can be used with `queryClient.ensureQueryData` to read from cache.
 */
export const allowanceQueryOptions = <TData = bigint>({
  client,
  owner,
  query,
  spender,
  token,
}: {
  client: Client | undefined;
  owner: Address | undefined;
  query?: Omit<
    UseQueryOptions<bigint, DefaultError, TData>,
    "queryFn" | "queryKey" | "enabled"
  >;
  spender: Address | undefined;
  token: {
    address: Address;
    chainId: Chain["id"];
  };
}) =>
  queryOptions({
    enabled:
      !!owner &&
      isAddress(owner) &&
      !!spender &&
      isAddress(spender) &&
      !!client,
    queryFn: () =>
      allowance(client!, {
        address: token.address,
        owner: owner!,
        spender: spender!,
      }),
    queryKey: allowanceQueryKey({ owner, spender, token }),
    ...query,
  });

/**
 * Fetches the ERC20 token allowance for an owner-spender pair.
 */
export const useAllowance = function <TData = bigint>({
  owner,
  query,
  spender,
  token,
}: UseAllowanceParameters<TData>) {
  const publicClient = usePublicClient({ chainId: token.chainId });

  return useQuery(
    allowanceQueryOptions({
      client: publicClient,
      owner,
      query,
      spender,
      token,
    }),
  );
};
