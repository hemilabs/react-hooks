# useVisualViewportSize

Returns the current `VisualViewport` height and top offset. Updates automatically when the visual viewport is resized (e.g., when a mobile keyboard opens or the page is pinch-zoomed).

## Import

```ts
import { useVisualViewportSize } from "@hemilabs/react-hooks/useVisualViewportSize";
```

## Parameters

None.

## Return Value

| Property  | Type     | Description                                                                    |
| --------- | -------- | ------------------------------------------------------------------------------ |
| height    | `number` | Current visual viewport height in pixels                                       |
| offsetTop | `number` | Distance from the top of the layout viewport to the top of the visual viewport |

Both values default to `0` during server-side rendering or when `window.visualViewport` is unavailable.

## Usage

```tsx
import { useVisualViewportSize } from "@hemilabs/react-hooks/useVisualViewportSize";

function StickyFooter() {
  const { height, offsetTop } = useVisualViewportSize();

  // Keep a footer pinned above the on-screen keyboard on mobile
  return (
    <div style={{ position: "fixed", top: offsetTop + height - 56 }}>
      Footer
    </div>
  );
}
```
