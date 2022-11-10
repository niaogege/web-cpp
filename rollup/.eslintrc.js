/*
 * @Author: Chendapeng
 * @Date: 2022-02-18 18:32:40
 * @LastEditors: Chendapeng
 * @LastEditTime: 2022-07-01 21:44:24
 * @Description:
 */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    ENV: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    quotes: ["error", "double"],
  },
};
