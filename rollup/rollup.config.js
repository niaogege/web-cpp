/*
 * @Author: Chendapeng
 * @Date: 2022-02-18 17:28:49
 * @LastEditors: Chendapeng
 * @LastEditTime: 2022-07-12 23:02:33
 * @Description:
 */
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import { babel } from "@rollup/plugin-babel";
import pJson from "@rollup/plugin-json";
import eslint from "@rollup/plugin-eslint";
import myFirstPlugin from "./src/plugins/demo/index.js";
import alias from "./src/plugins/alias/index";
export default {
  input: {
    index: "src/index.js",
  },
  output: [
    {
      dir: "dist/es",
      format: "esm",
      sourcemap: true,
      name: "TheFirstTestCpp",
    },
    {
      dir: "dist/cjs",
      format: "cjs",
    },
    {
      dir: "dist/cpp",
      format: "umd",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    myFirstPlugin(),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ["src/**"],
      exclude: ["node_modules/**"],
    }),
    pJson(),
    alias({
      entries: [
        {
          find: "./test.js",
          replacement: "./testAA.js",
        },
      ],
    }),
    // terser()
  ],
  external: [],
};
