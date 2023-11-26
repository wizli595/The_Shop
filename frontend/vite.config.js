import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        debug: true,
      },
    },
    hmr: false, //make the proxy work more offician and ctrl+s not work
  },
  resolve: {
    alias: {
      "@": "../",
    },
  },
});
