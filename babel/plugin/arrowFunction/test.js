const { transformFileSync } = require("@babel/core");
const changeFunctionPlugin = require("./index");
const path = require("path");
const fs = require("fs");
const FileName = "./target.js";
const { code } = transformFileSync(path.join(__dirname, "./source.js"), {
  plugins: [changeFunctionPlugin],
  parserOpts: {
    sourceType: "unambiguous",
  },
});
fs.writeFileSync(FileName, code);
console.log(code, "CODE");
