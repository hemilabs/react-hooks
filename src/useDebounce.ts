import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    function updateDebouncedValue() {
      const timer = setTimeout(setDebouncedValue, delay, value);
      return () => clearTimeout(timer);
    },
    [delay, value],
  );

  return debouncedValue;
}
