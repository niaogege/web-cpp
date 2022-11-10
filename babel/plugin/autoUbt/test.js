const { transformFileSync } = require("@babel/core");
const autoUbtPlugin = require("./index");
const path = require("path");
const fs = require("fs");
const FileName = "./target.js";
const { code } = transformFileSync(path.join(__dirname, "./source.js"), {
  plugins: [
    [
      autoUbtPlugin,
      {
        trackerPath: "tracker",
      },
    ],
  ],
  parserOpts: {
    sourceType: "unambiguous",
  },
});
fs.writeFileSync(FileName, code);
console.log(code, "CODE");
