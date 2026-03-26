# useDebounce

Debounces a value, returning the updated value only after a specified delay has passed without changes.

## Import

```ts
import { useDebounce } from "@hemilabs/react-hooks/useDebounce";
```

## Parameters

| Parameter | Type     | Required | Default | Description           |
| --------- | -------- | -------- | ------- | --------------------- |
| value     | `T`      | Yes      | -       | The value to debounce |
| delay     | `number` | No       | `300`   | Delay in milliseconds |

## Return Value

Returns the debounced value of type `T`.

## Usage

```tsx
import { useDebounce } from "@hemilabs/react-hooks/useDebounce";

function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    // Only fires 500ms after the user stops typing
    fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```
