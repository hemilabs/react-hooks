import { useQuery } from "@tanstack/react-query";
import type { Address, Chain } from "viem";
import { allowance } from "viem-erc20/actions";
import { usePublicClient } from "wagmi";
import type {
  UseQueryOptions,
  QueryKey,
  DefaultError,
} from "@tanstack/react-query";

type UseAllowanceParameters<TData = bigint> = {
  owner: Address | undefined;
  spender: Address | undefined;
  query?: Omit<
    UseQueryOptions<bigint, DefaultError, TData, QueryKey>,
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
 * Fetches the ERC20 token allowance for an owner-spender pair.
 */
export const useAllowance = <TData = bigint>({
  owner,
  spender,
  token,
  query,
}: UseAllowanceParameters<TData>) => {
  const publicClient = usePublicClient({ chainId: token.chainId });

  return useQuery({
    queryKey: allowanceQueryKey({ owner, spender, token }),
    queryFn: () =>
      allowance(publicClient!, {
        address: token.address,
        owner: owner!,
        spender: spender!,
      }),
    enabled: !!publicClient && !!owner && !!spender,
    ...query,
  });
};
