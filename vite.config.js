import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  define: {
    "process.env": {},
  },

  build: {
    emptyOutDir: true,

    // Force a single CSS output file
    cssCodeSplit: false,

    lib: {
      entry: "src/widget.jsx",

      // Global browser window object
      name: "WebSmartAssistant",

      // Final chatbot widget JS filename
      fileName: () => "chatbot-widget.js",

      formats: ["iife"],
    },

    rollupOptions: {
      output: {
        /*
          Automatically rename the CSS bundle
          so we no longer manually rename it after build.
        */
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "chatbot-widget.css";
          }

          return assetInfo.name;
        },
      },
    },
  },
});