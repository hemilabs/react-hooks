# useOnClickOutside

Calls a handler when clicking or touching outside the referenced element.

## Import

```ts
import { useOnClickOutside } from "@hemilabs/react-hooks/useOnClickOutside";
```

## Parameters

| Parameter  | Type                                    | Required | Description                    |
| ---------- | --------------------------------------- | -------- | ------------------------------ |
| handler    | `(e: MouseEvent \| TouchEvent) => void` | No       | Callback when clicking outside |
| initialRef | `RefObject<T \| null>`                  | No       | Optional existing ref to use   |

> **Note:** Wrap `handler` in `useCallback` to avoid re-attaching listeners on every render.

## Return Value

Returns a `RefObject<T | null>` to attach to the target element.

## Usage

```tsx
import { useOnClickOutside } from "@hemilabs/react-hooks/useOnClickOutside";

function Dropdown() {
  const [open, setOpen] = useState(false);
  const ref = useOnClickOutside<HTMLDivElement>(
    useCallback(() => setOpen(false), []),
  );

  return <div ref={ref}>{open && <ul>...</ul>}</div>;
}
```
