import type { Address, Chain } from "viem";
import { useAccount } from "wagmi";

import { useAllowance } from "./useAllowance";

type UseNeedsApprovalParameters = {
  amount: bigint;
  spender: Address;
  token: {
    address: Address;
    chainId: Chain["id"];
  };
};

/**
 * Checks if an ERC20 token needs approval for a specific amount.
 * Returns true if the current allowance is less than the required amount.
 */
export const useNeedsApproval = ({
  amount,
  spender,
  token,
}: UseNeedsApprovalParameters) => {
  const { address: owner } = useAccount();

  return useAllowance({
    owner,
    spender,
    token,
    query: {
      select: (allowance) => allowance < amount,
    },
  });
};
