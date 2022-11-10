const { template } = require("@babel/core");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const types = require("@babel/types");
const sourceCode = `
  console.log("cpp");
  function func() {
    console.info(2);
  }

  export default class Clazz {
    say() {
      console.debug(3);
    }
    render() {
      return <div>{console.error(4)}</div>;
    }
  }
`;

const ast = parser.parse(sourceCode, {
  sourceType: "unambiguous",
  plugins: ["jsx"],
});

// traverse(ast, {
//   CallExpression(path, state) {
//     const callee = path.node.callee;
//     if (
//       types.isMemberExpression(callee) &&
//       callee.object.name === "console" &&
//       ["log", "warn", "info", "debugger"].includes(callee.property.name)
//     ) {
//       const { line, column } = path.node.loc.start;
//       path.node.arguments.unshift(
//         types.stringLiteral(`fileName: ${line}, ${column}`)
//       );
//     }
//   },
// });

const targetCalleeName = ["log", "info", "error", "debug"].map(
  (item) => `console.${item}`
);
traverse(ast, {
  CallExpression(path, state) {
    if (path.node.isNew) {
      return;
    }
    const calleeName = generate(path.node.callee).code;
    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;
      const newCode = template.expression(
        `console.log("fileName: (${line}, ${column})")`
      )();
      newCode.isNew = true;
      if (path.findParent((path) => path.isJSXElement())) {
        path.replaceWith(types.arrayExpression([newNode, path.node]));
        path.skip();
      } else {
        path.insertBefore(newNode);
      }
    }
  },
});
