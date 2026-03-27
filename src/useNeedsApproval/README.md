# useNeedsApproval

Checks if an ERC20 token needs approval for a specific amount. Returns `true` if the current allowance is less than the required amount.

## Import

```ts
import { useNeedsApproval } from "@hemilabs/react-hooks/useNeedsApproval";
```

## Parameters

| Parameter     | Type      | Required | Description             |
| ------------- | --------- | -------- | ----------------------- |
| amount        | `bigint`  | Yes      | Amount to check against |
| spender       | `Address` | Yes      | Spender address         |
| token.address | `Address` | Yes      | Token contract address  |
| token.chainId | `number`  | Yes      | Chain ID                |

## Return Value

Returns `UseQueryResult<boolean>` - `true` if approval is needed.

## Usage

```tsx
import { useNeedsApproval } from "@hemilabs/react-hooks/useNeedsApproval";

function ApproveButton() {
  const { data: needsApproval } = useNeedsApproval({
    amount: 1000000n,
    spender: "0x...",
    token: { address: "0x...", chainId: 1 },
  });

  if (!needsApproval) return null;
  return <button>Approve Token</button>;
}
```
