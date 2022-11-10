const postcss = require("postcss");
const moduleScope = require("./index");

const input2 = `
.cpp {
  color: red
}
:local(.peng) {
  color: blue
}
:local(.pengpeng) {
  color: yellow
}
:local(.chenpp) {
  composes-with: peng;
  composes: pengpeng;
  color: red;
}
@keyframes :local(chenpengpeng) {
   from {
        width: 0;
    }
    to {
        width: 100px;
    }
}
`;

const res = postcss([moduleScope]).process(input2);

console.log(res.css, "res");
