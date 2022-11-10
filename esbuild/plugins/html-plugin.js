const fs = require("fs/promises");
const path = require("path");

const { createScript, createLink, generateHtml } = require("./util");

module.exports = () => ({
  name: "esbuild: html-plugin",
  setup(build) {
    build.onEnd(async (buildResult) => {
      if (buildResult.errors.length) {
        return;
      }
      console.log(buildResult, "buildResult");
      const { metafile } = buildResult;
      // 拿到js/css
      const scripts = [];
      const links = [];
      if (metafile) {
        const { outputs = {} } = metafile;
        console.log(outputs, "OUTput");
        let keys = Object.keys(outputs);
        for (let k of keys) {
          if (k.endsWith(".js")) {
            scripts.push(createScript(k));
          } else if (k.endsWith(".css")) {
            links.push(createLink(k));
          }
        }
        // 拼接html
        const templateContent = generateHtml(scripts, links);
        // html写入磁盘
        const tempaltePath = path.join(process.cwd(), "index.html");
        await fs.writeFile(tempaltePath, templateContent);
      }
    });
  },
});
