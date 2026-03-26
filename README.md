# @hemilabs/react-hooks

[![NPM version](https://img.shields.io/npm/v/@hemilabs/react-hooks)](https://www.npmjs.com/package/@hemilabs/react-hooks) [![Package size](https://img.shields.io/bundlephobia/minzip/@hemilabs/react-hooks)](https://bundlephobia.com/package/@hemilabs/react-hooks) [![Follow Hemi on X](https://img.shields.io/twitter/url?url=https%3A%2F%2Fx.com%2Fhemi_xyz&style=flat&logo=x&label=%40hemi_xyz&labelColor=%23ff6c15&color=%230a0a0a)](https://x.com/intent/follow?screen_name=hemi_xyz)

Set of reusable hooks for Hemilabs apps with React and Typescript

## Installation

Make sure the peer dependencies list is installed

```sh
npm install @tanstack/react-query viem viem-erc20 wagmi @hemilabs/wallet-watch-asset
```

then install

```sh
npm install @hemilabs/react-hooks
```

## Hooks Reference

| Hook Name                          | Docs                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| useAddTokenToWallet                | [useAddTokenToWallet](./src/useAddTokenToWallet)                               |
| useAllowance                       | [useAllowance](./src/useAllowance)                                             |
| useDebounce                        | [useDebounce](./src/useDebounce)                                               |
| useEnsureConnectedTo               | [useEnsureConnectedTo](./src/useEnsureConnectedTo)                             |
| useEstimateApproveErc20Fees        | [useEstimateApproveErc20Fees](./src/useEstimateApproveErc20Fees)               |
| useEstimateFees                    | [useEstimateFees](./src/useEstimateFees)                                       |
| useNativeBalance                   | [useNativeBalance](./src/useNativeBalance)                                     |
| useNeedsApproval                   | [useNeedsApproval](./src/useNeedsApproval)                                     |
| useOnClickOutside                  | [useOnClickOutside](./src/useOnClickOutside)                                   |
| useOnKeyUp                         | [useOnKeyUp](./src/useOnKeyUp)                                                 |
| useTokenBalance                    | [useTokenBalance](./src/useTokenBalance)                                       |
| useTotalSupply                     | [useTotalSupply](./src/useTotalSupply)                                         |
| useUpdateNativeBalanceAfterReceipt | [useUpdateNativeBalanceAfterReceipt](./src/useUpdateNativeBalanceAfterReceipt) |
| useWindowSize                      | [useWindowSize](./src/useWindowSize)                                           |
