# useTokenBalance

Fetches the ERC20 token balance for the connected account.

## Import

```ts
import {
  useTokenBalance,
  tokenBalanceQueryKey,
  tokenBalanceQueryOptions,
} from "@hemilabs/react-hooks/useTokenBalance";
```

## Parameters

Takes a `token` object directly (not wrapped):

| Parameter | Type      | Required | Description            |
| --------- | --------- | -------- | ---------------------- |
| address   | `Address` | Yes      | Token contract address |
| chainId   | `number`  | Yes      | Chain ID               |

## Return Value

Returns `UseQueryResult<bigint>` with the token balance.

## Exported Helpers

- **`tokenBalanceQueryKey(token, account)`** - Generates a query key for cache management.
- **`tokenBalanceQueryOptions({ account, client, token })`** - Generates query options for use with `queryClient.ensureQueryData`.

## Usage

```tsx
import { useTokenBalance } from "@hemilabs/react-hooks/useTokenBalance";

function TokenBalance() {
  const { data: balance } = useTokenBalance({
    address: "0x...",
    chainId: 1,
  });

  return <span>Balance: {balance?.toString()}</span>;
}
```
