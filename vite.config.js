import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  build: {
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: "src/widget.jsx",
      name: "WebSmartAssistant",
      fileName: () => "widget.js",
      formats: ["iife"],
    },
  },
});