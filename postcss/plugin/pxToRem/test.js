const postcss = require("postcss");
const moduleScope = require("./newIndex");
const fs = require("fs");
const path = require("path");
const input2 = `
test {
  width: 20px;
}
a {
  font-size: 28px;
}
.ignore {
  border: 1Px solid red;
  border-width: 2Px;
}
`;

const res = postcss([moduleScope({ rootValue: 16 })]).process(input2);
const from = path.join(__dirname, "./test.css");
fs.writeFile(from, res.css, function (err) {
  if (err) {
    throw err;
  }
  console.log("File is Writen");
});
console.log(res.css, "res");
