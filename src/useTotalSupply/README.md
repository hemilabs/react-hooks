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

| Parameter     | Type      | Required | Description            |
| ------------- | --------- | -------- | ---------------------- |
| token.address | `Address` | Yes      | Token contract address |
| token.chainId | `number`  | Yes      | Chain ID               |

## Return Value

Returns `UseQueryResult<bigint>` with the total supply.

## Exported Helpers

- **`totalSupplyQueryKey({ token })`** - Generates a query key for cache management.

## Usage

```tsx
import { useTotalSupply } from "@hemilabs/react-hooks/useTotalSupply";

function TotalSupply() {
  const { data: totalSupply } = useTotalSupply({
    token: { address: "0x...", chainId: 1 },
  });

  return <span>Total Supply: {totalSupply?.toString()}</span>;
}
```
