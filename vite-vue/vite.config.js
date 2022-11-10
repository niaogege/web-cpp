import { defineConfig } from "vite";
import cppPlugin from "./plugins/vite-plugin-cpp";
import vue from "@vitejs/plugin-vue";
import HooksOrder from "./plugins/hooks-order";
import federation from "@originjs/vite-plugin-federation";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cppPlugin(),
    HooksOrder(),
    federation({
      remotes: {
        remote_app: "http://localhost:3001/assets/remoteEntry.js",
      },
      shared: ["vue"],
    }),
  ],
  css: {
    modules: {
      generateScopedName: "[name]__[local]__[hash:base64:5]",
      localsConvention: "camelCaseOnly",
    },
  },
});
