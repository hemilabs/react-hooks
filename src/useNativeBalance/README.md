# useNativeBalance

Fetches the native token balance for the connected account on a specific chain.

## Import

```ts
import { useNativeBalance } from "@hemilabs/react-hooks/useNativeBalance";
```

## Parameters

| Parameter | Type     | Required | Description |
| --------- | -------- | -------- | ----------- |
| chainId   | `number` | Yes      | Chain ID    |

## Return Value

Returns the result from wagmi's `useBalance` hook.

## Usage

```tsx
import { useNativeBalance } from "@hemilabs/react-hooks/useNativeBalance";

function Balance() {
  const { data: balance } = useNativeBalance(1);

  return (
    <span>
      Balance: {balance?.formatted} {balance?.symbol}
    </span>
  );
}
```
