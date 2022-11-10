const { transform, transformSync } = require("esbuild");

let str = `const isNull = (str: string): boolean => str.length > 0;`;
async function runTransform() {
  const content = await transform(str, {
    sourcemap: true,
    loader: "tsx",
  });
  console.log(content, "Content");
}
runTransform();
