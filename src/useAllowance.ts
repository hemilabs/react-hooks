import { queryOptions, useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, DefaultError } from "@tanstack/react-query";
import type { Address, Chain, Client } from "viem";
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
  client: Client;
  owner: Address;
  query?: Omit<
    UseQueryOptions<bigint, DefaultError, TData>,
    "queryFn" | "queryKey" | "enabled"
  >;
  spender: Address;
  token: {
    address: Address;
    chainId: Chain["id"];
  };
}) =>
  queryOptions({
    enabled: !!owner && !!spender && !!client,
    queryFn: () =>
      allowance(client, {
        address: token.address,
        owner,
        spender,
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
      client: publicClient!,
      owner: owner!,
      query,
      spender: spender!,
      token,
    }),
  );
};
