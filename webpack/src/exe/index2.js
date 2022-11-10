(async function () {
  const tt = await import("./test2.mjs");
  console.log(tt);
  const argv = process.argv;
  console.log(tt.default(argv[2] || "巧言令色，鮮矣仁！"));
})();

const { builtinModules } = require("module");
console.log(builtinModules, "builtinModules");
