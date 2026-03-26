# useWindowSize

Returns the current window dimensions. Updates automatically when the window is resized.

## Import

```ts
import { useWindowSize } from "@hemilabs/react-hooks/useWindowSize";
```

## Parameters

None.

## Return Value

| Property | Type     | Description                     |
| -------- | -------- | ------------------------------- |
| height   | `number` | Current window height in pixels |
| width    | `number` | Current window width in pixels  |

Both values default to `0` during server-side rendering.

## Usage

```tsx
import { useWindowSize } from "@hemilabs/react-hooks/useWindowSize";

function ResponsiveLayout() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window: {width}x{height}
      {width < 768 && <MobileNav />}
    </div>
  );
}
```
