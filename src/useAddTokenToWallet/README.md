# useAddTokenToWallet

Provides a mutation to add a token to the user's wallet. Ensures the wallet is connected to the correct chain before adding.

## Import

```ts
import { useAddTokenToWallet } from "@hemilabs/react-hooks/useAddTokenToWallet";
```

## Parameters

Takes an options object:

| Parameter                | Type      | Required | Description                |
| ------------------------ | --------- | -------- | -------------------------- |
| token.address            | `Address` | Yes      | Token contract address     |
| token.chainId            | `number`  | Yes      | Chain ID where token lives |
| token.extensions.logoURI | `string`  | No       | Token logo URL             |

## Return Value

Returns a `UseMutationResult` from TanStack React Query. Call `mutate()` or `mutateAsync()` to trigger the wallet prompt.

## Usage

```tsx
import { useAddTokenToWallet } from "@hemilabs/react-hooks/useAddTokenToWallet";

function AddToken() {
  const { mutate: addToken } = useAddTokenToWallet({
    token: {
      address: "0x...",
      chainId: 1,
      extensions: { logoURI: "https://example.com/logo.png" },
    },
  });

  return <button onClick={() => addToken()}>Add Token to Wallet</button>;
}
```
