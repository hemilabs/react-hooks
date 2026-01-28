# @hemilabs/react-hooks

[![NPM version](https://img.shields.io/npm/v/@hemilabs/react-hooks)](https://www.npmjs.com/package/@hemilabs/react-hooks) [![Package size](https://img.shields.io/bundlephobia/minzip/@hemilabs/react-hooks)](https://bundlephobia.com/package/@hemilabs/react-hooks) [![Follow Hemi on X](https://img.shields.io/twitter/url?url=https%3A%2F%2Fx.com%2Fhemi_xyz&style=flat&logo=x&label=%40hemi_xyz&labelColor=%23ff6c15&color=%230a0a0a)](https://x.com/intent/follow?screen_name=hemi_xyz)

Set of reusable hooks for Hemilabs apps with React and Typescript

## Installation

Make sure the peer dependencies list is installed

```sh
npm install @tanstack/react-query viem viem-erc20 wagmi github:hemilabs/wallet-watch-asset#v1.0.1
```

then install

```sh
npm install @hemilabs/react-hooks
```

## Hooks Reference

| Hook Name                          | Source File                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------- |
| useAddTokenToWallet                | [useAddTokenToWallet](./src/useAddTokenToWallet.ts)                               |
| useAllowance                       | [useAllowance](./src/useAllowance.ts)                                             |
| useEnsureConnectedTo               | [useEnsureConnectedTo](./src/useEnsureConnectedTo.ts)                             |
| useNativeBalance                   | [useNativeBalance](./src/useNativeBalance.ts)                                     |
| useTokenBalance                    | [useTokenBalance](./src/useTokenBalance.ts)                                       |
| useEstimateApproveGasUnits         | [useEstimateApproveGasUnits](./src/useEstimateApproveGasUnits.ts)                 |
| useUpdateNativeBalanceAfterReceipt | [useUpdateNativeBalanceAfterReceipt](./src/useUpdateNativeBalanceAfterReceipt.ts) |
| useNeedsApproval                   | [useNeedsApproval](./src/useNeedsApproval.ts)                                     |
| useOnClickOutside                  | [useOnClickOutside](./src/useOnClickOutside.ts)                                   |
| useOnKeyUp                         | [useOnKeyUp](./src/useOnKeyUp.ts)                                                 |
| useTotalSupply                     | [useTotalSupply](./src/useTotalSupply.ts)                                         |
| useWindowSize                      | [useWindowSize](./src/useWindowSize.ts)                                           |
