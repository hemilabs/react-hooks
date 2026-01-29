import { useQuery } from "@tanstack/react-query";
import { type Address, type Chain, isAddress } from "viem";
import { totalSupply } from "viem-erc20/actions";
import { usePublicClient } from "wagmi";

type TotalSupplyParams = {
  address: Address;
  chainId: Chain["id"];
};

/**
 * Generates a query key for the total supply query.
 */
export const totalSupplyQueryKey = (token: TotalSupplyParams) =>
  ["totalSupply", token.chainId, token.address] as const;

/**
 * Fetches the total supply of an ERC20 token.
 */
export const useTotalSupply = function (token: TotalSupplyParams) {
  const publicClient = usePublicClient({ chainId: token.chainId });

  return useQuery({
    enabled: isAddress(token.address) && !!publicClient,
    queryFn: () =>
      totalSupply(publicClient!, {
        address: token.address,
      }),
    queryKey: totalSupplyQueryKey(token),
  });
};
