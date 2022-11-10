const parser = require("@babel/parser");
const { default: traverse } = require("@babel/traverse");
const { default: generate } = require("@babel/generator");

const ast = parser.parse("const a = 1");
traverse(ast, {
  VariableDeclaration(path, state) {
    console.log(path.node, "path");
    console.log(state, "state");
    path.node.kind = "var";
  },
});

const transformCode = generate(ast).code;
console.log(transformCode, "transformCode");

module.exports = {
  visitors: {
    VariableDeclaration(path, state) {
      path.node.kind = "var";
    },
  },
};
