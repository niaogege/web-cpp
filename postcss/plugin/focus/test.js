const postcssFocus = require("./index");
const postcss = require("postcss");
const fs = require("fs");
const path = require("path");
// 输入的css文件地址
const from = path.join(__dirname, "./test.css");
const to = path.join(__dirname, "./a.css");

function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      args.push(function (err, ...val) {
        if (err) {
          reject(err);
        } else {
          resolve(val);
        }
      });
      fn.apply(this, args);
    });
}

const readFileAsync = promisify(fs.readFile);

async function init() {
  try {
    const [css] = await readFileAsync(from);
    postcss([postcssFocus])
      .process(css, { from, to })
      .then((result) => {
        fs.writeFileSync(to, result.css);
      });
  } catch (e) {
    console.log(e);
  }
}

init();
