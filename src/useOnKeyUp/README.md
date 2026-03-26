# useOnKeyUp

Attaches a `keyup` event listener to the document.

## Import

```ts
import { useOnKeyUp } from "@hemilabs/react-hooks/useOnKeyUp";
```

## Parameters

| Parameter  | Type                         | Required | Description                  |
| ---------- | ---------------------------- | -------- | ---------------------------- |
| handler    | `(e: KeyboardEvent) => void` | Yes      | Callback on keyup event      |
| initialRef | `RefObject<T \| null>`       | No       | Optional existing ref to use |

## Return Value

Returns a `RefObject<T | null>` for optional element tracking.

## Usage

```tsx
import { useCallback, useState } from "react";
import { useOnKeyUp } from "@hemilabs/react-hooks/useOnKeyUp";

function Modal() {
  const [open, setOpen] = useState(true);
  const ref = useOnKeyUp<HTMLDivElement>(
    useCallback((e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }, []),
  );

  if (!open) return null;
  return <div ref={ref}>Press Escape to close</div>;
}
```
