# useAllowance

Fetches the ERC20 token allowance for an owner-spender pair.

## Import

```ts
import {
  useAllowance,
  allowanceQueryKey,
  allowanceQueryOptions,
} from "@hemilabs/react-hooks/useAllowance";
```

## Parameters

| Parameter | Type                                    | Required | Description                                                           |
| --------- | --------------------------------------- | -------- | --------------------------------------------------------------------- |
| owner     | `Address \| undefined`                  | No       | Token owner address                                                   |
| spender   | `Address \| undefined`                  | No       | Spender address                                                       |
| token     | `{ address: Address; chainId: number }` | Yes      | Token contract info                                                   |
| query     | `UseQueryOptions`                       | No       | Additional query options (excluding `queryFn`, `queryKey`, `enabled`) |

## Return Value

Returns `UseQueryResult<bigint>` with the allowance amount.

## Exported Helpers

- **`allowanceQueryKey({ owner, spender, token })`** - Generates a query key for cache management.
- **`allowanceQueryOptions({ client, owner, spender, token, query })`** - Generates query options for use with `queryClient.ensureQueryData`.

## Usage

```tsx
import { useAllowance } from "@hemilabs/react-hooks/useAllowance";

function Allowance() {
  const { data: allowance } = useAllowance({
    owner: "0x...",
    spender: "0x...",
    token: { address: "0x...", chainId: 1 },
  });

  return <span>Allowance: {allowance?.toString()}</span>;
}
```
