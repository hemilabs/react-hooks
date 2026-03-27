# useEstimateFees

Estimates the total transaction fee for an EIP-1559 compatible network. Uses recent base fee history and a suggested or fallback `maxPriorityFeePerGas` to calculate a conservative `maxFeePerGas`, multiplied by the estimated gas units.

## Import

```ts
import {
  useEstimateFees,
  estimateFeesQueryOptions,
} from "@hemilabs/react-hooks/useEstimateFees";
```

## Parameters

| Parameter           | Type      | Required | Default                | Description                                     |
| ------------------- | --------- | -------- | ---------------------- | ----------------------------------------------- |
| chainId             | `number`  | Yes      | -                      | Chain ID of the target network                  |
| fallbackPriorityFee | `bigint`  | No       | `1000000000n` (1 gwei) | Fallback priority fee when unavailable          |
| gasUnits            | `bigint`  | No       | -                      | Estimated gas units for the transaction         |
| isGasUnitsError     | `boolean` | No       | `false`                | Whether there was an error estimating gas units |
| overEstimation      | `number`  | No       | `1.5`                  | Multiplier to pad the estimated fee             |

## Return Value

| Property | Type                  | Description                           |
| -------- | --------------------- | ------------------------------------- |
| fees     | `bigint \| undefined` | Estimated total fee in wei            |
| isError  | `boolean`             | Whether there was an estimation error |

## Exported Helpers

- **`estimateFeesQueryOptions({ chainId, config, gasUnits, queryClient, ... })`** - Generates query options for use with `queryClient.ensureQueryData` or `queryClient.fetchQuery` outside of React.

## Usage

```tsx
import { useEstimateFees } from "@hemilabs/react-hooks/useEstimateFees";

function TransactionFee() {
  const { fees, isError } = useEstimateFees({
    chainId: 1,
    gasUnits: 21000n,
  });

  if (isError) return <span>Error estimating fees</span>;
  return <span>Estimated fee: {fees?.toString()} wei</span>;
}
```
