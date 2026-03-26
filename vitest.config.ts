import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    exclude: ["_esm/**", "node_modules/**"],
  },
});
