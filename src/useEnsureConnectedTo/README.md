# useEnsureConnectedTo

Returns a function that ensures the wallet is connected to a specific chain. Throws an error if no account is connected, or switches chains if needed.

## Import

```ts
import { useEnsureConnectedTo } from "@hemilabs/react-hooks/useEnsureConnectedTo";
```

## Parameters

None.

## Return Value

Returns an async function: `(targetChainId: number) => Promise<void>`

- Throws if no wallet account is connected.
- Switches chain if the wallet is connected to a different chain.

## Usage

```tsx
import { useEnsureConnectedTo } from "@hemilabs/react-hooks/useEnsureConnectedTo";
import { optimism } from "viem/chains";

function ChainSwitch() {
  const ensureConnectedTo = useEnsureConnectedTo();

  const handleClick = async () => {
    // Switch to Optimism if not connected
    await ensureConnectedTo(optimism.id);
    // Do another op now in the OP chain
  };

  return <button onClick={handleClick}>Submit</button>;
}
```
