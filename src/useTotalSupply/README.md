# useTotalSupply

Fetches the total supply of an ERC20 token.

## Import

```ts
import {
  useTotalSupply,
  totalSupplyQueryKey,
} from "@hemilabs/react-hooks/useTotalSupply";
```

## Parameters

Takes a `token` object directly (not wrapped):

| Parameter | Type      | Required | Description            |
| --------- | --------- | -------- | ---------------------- |
| address   | `Address` | Yes      | Token contract address |
| chainId   | `number`  | Yes      | Chain ID               |

## Return Value

Returns `UseQueryResult<bigint>` with the total supply.

## Exported Helpers

- **`totalSupplyQueryKey(token)`** - Generates a query key for cache management.

## Usage

```tsx
import { useTotalSupply } from "@hemilabs/react-hooks/useTotalSupply";

function TotalSupply() {
  const { data: totalSupply } = useTotalSupply({
    address: "0x...",
    chainId: 1,
  });

  return <span>Total Supply: {totalSupply?.toString()}</span>;
}
```
