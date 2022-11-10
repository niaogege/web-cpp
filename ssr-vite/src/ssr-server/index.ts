import express, { RequestHandler, Express } from "express";
import { ViteDevServer } from "vite";
import path from "path";
import fs from "fs";
import { renderToString } from "react-dom/server";
import serve from "serve-static";
import { createElement } from "react";

const isProd = process.env.NODE_ENV === "production";
const cwd = process.cwd();

function resolveTemplatePath() {
  return isProd
    ? path.join(cwd, "dist/client/index.html")
    : path.join(cwd, "index.html");
}

function matchPageUrl(url: string) {
  if (url === "/") {
    return true;
  }
  return false;
}
async function createSsrMiddleware(app: Express): Promise<RequestHandler> {
  let vite: ViteDevServer | null = null;
  if (!isProd) {
    vite = await (
      await import("vite")
    ).createServer({
      root: process.cwd(),
      server: {
        middlewareMode: true,
      },
      appType: "custom",
    });
    // 注册 Vite Middlewares
    // 主要用来处理客户端资源
    app.use(vite.middlewares);
  }
  return async (req, res, next) => {
    try {
      const url = req.originalUrl;
      console.log(url, "URL");
      if (!matchPageUrl(url)) {
        // 走静态资源逻辑
        return await next();
      }
      // SSR 的逻辑
      // 1. 加载服务端入口模块
      const { ServerEntry, fetchData } = await loadSsrEntryModule(vite);
      // 2. 数据预取
      const data = await fetchData();
      // 3. 「核心」渲染组件 => 字符串
      const appHtml = renderToString(createElement(ServerEntry, { data }));
      // 4. 拼接 HTML，返回响应
      const templatePath = resolveTemplatePath();
      let template = await fs.readFileSync(templatePath, "utf-8");
      if (!isProd && vite) {
        template = await vite.transformIndexHtml(url, template);
      }
      const html = template
        .replace("<!-- SSR_APP -->", appHtml)
        .replace(
          "<!-- SSR_DATA -->",
          `<script>window.context=${JSON.stringify(data)}</script>`
        );
      res.status(200).setHeader("Content-Type", "text/html").end(html);
    } catch (e: any) {
      vite?.ssrFixStacktrace(e);
      console.error(e);
    }
  };
}

async function loadSsrEntryModule(vite: ViteDevServer | null) {
  // 生产模式下直接 require 打包后的产物
  if (isProd) {
    const entryPath = path.join(cwd, "dist/server/entry-server.js");
    return import(entryPath);
  } else {
    // 开发环境通过no-bundle方式
    const entryPath = path.join(cwd, "src/entry-server.tsx");
    return vite!.ssrLoadModule(entryPath);
  }
}

async function createServer() {
  const app = express();
  // 加入 Vite SSR 中间件
  app.use(await createSsrMiddleware(app));
  console.log("CPP:::", path.join(cwd, "dist/client"));
  if (isProd) {
    app.use(serve(path.join(cwd, "dist/client")));
  }

  app.listen(3000, () => {
    console.log("Node 服务器已启动~");
    console.log("http://localhost:3000");
  });
}
createServer();
