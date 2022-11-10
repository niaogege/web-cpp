# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## vite 模块联邦

文档参考链接[vite 模块联邦](https://juejin.cn/book/7050063811973218341/section/7068105121523531806)

> 需要付费购买神三元掘金小册

```js
// vite.config.js
    federation({
      remotes: {
        remote_app: "http://localhost:3001/assets/remoteEntry.js",
      },
      shared: ["vue"],
    }),
```

如果要浏览模块联邦相关功能，首先需要启动远程仓库[vite-vue-remote](../vite-vue-remote/)
