# useUpdateNativeBalanceAfterReceipt

Returns a function that updates the cached native token balance after a transaction receipt. Subtracts gas costs and an optional amount from the cached balance.

## Import

```ts
import { useUpdateNativeBalanceAfterReceipt } from "@hemilabs/react-hooks/useUpdateNativeBalanceAfterReceipt";
```

## Parameters

| Parameter | Type     | Required | Description |
| --------- | -------- | -------- | ----------- |
| chainId   | `number` | Yes      | Chain ID    |

## Return Value

Returns a function: `(receipt: TransactionReceipt, amount?: bigint) => void`

| Parameter | Type                 | Required | Default     | Description                       |
| --------- | -------------------- | -------- | ----------- | --------------------------------- |
| receipt   | `TransactionReceipt` | Yes      | -           | Transaction receipt with gas info |
| amount    | `bigint`             | No       | `BigInt(0)` | Additional amount to subtract     |

## Usage

```tsx
import { useUpdateNativeBalanceAfterReceipt } from "@hemilabs/react-hooks/useUpdateNativeBalanceAfterReceipt";

function Transaction() {
  const updateBalance = useUpdateNativeBalanceAfterReceipt(1);

  const onSuccess = (receipt: TransactionReceipt) => {
    // Updates cached balance by subtracting gas + amount sent
    updateBalance(receipt, parseEther("0.1"));
  };

  return <button onClick={sendTx}>Send</button>;
}
```
