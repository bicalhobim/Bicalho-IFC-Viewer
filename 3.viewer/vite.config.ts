import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    target: "esnext",
  },
  server: {
    port: 3000,
    open: true,
  },
});
