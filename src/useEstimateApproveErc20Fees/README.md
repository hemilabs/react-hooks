# useEstimateApproveErc20Fees

Estimates the total transaction fees for approving an ERC20 token.

## Import

```ts
import { useEstimateApproveErc20Fees } from "@hemilabs/react-hooks/useEstimateApproveErc20Fees";
```

## Parameters

| Parameter     | Type      | Required | Default | Description                      |
| ------------- | --------- | -------- | ------- | -------------------------------- |
| amount        | `bigint`  | Yes      | -       | Amount to approve                |
| spender       | `Address` | Yes      | -       | Spender address                  |
| token.address | `Address` | Yes      | -       | Token contract address           |
| token.chainId | `number`  | Yes      | -       | Chain ID                         |
| enabled       | `boolean` | No       | `true`  | Whether to enable the estimation |

## Return Value

| Property | Type                  | Description                           |
| -------- | --------------------- | ------------------------------------- |
| fees     | `bigint \| undefined` | Estimated total fee in wei            |
| isError  | `boolean`             | Whether there was an estimation error |

## Usage

```tsx
import { useEstimateApproveErc20Fees } from "@hemilabs/react-hooks/useEstimateApproveErc20Fees";

function ApproveFees() {
  const { fees, isError } = useEstimateApproveErc20Fees({
    amount: 1000000n,
    spender: "0x...",
    token: { address: "0x...", chainId: 1 },
  });

  if (isError) return <span>Error estimating fees</span>;
  return <span>Estimated fee: {fees?.toString()} wei</span>;
}
```
