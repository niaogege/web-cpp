const { transformFileSync } = require("@babel/core");
const insertPlugin = require("./index");
const path = require("path");
const fs = require("fs");
const FileName = "./source.js";
const TargetName = "./target.js";
const { code } = transformFileSync(path.join(__dirname, FileName), {
  plugins: [insertPlugin],
  parserOpts: {
    sourceType: "unambiguous",
    plugins: ["jsx"],
  },
});

fs.writeFileSync(TargetName, code);
