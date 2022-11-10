const { declare } = require("@babel/helper-plugin-utils");
module.exports = function ({ types: t, template, assertVersion }) {
  assertVersion(7);
  return {
    name: "my-plugin",
    visitor: {
      Identifier(path, state) {
        if (path.node.name === "spliceText") {
          path.node.name = "cpp";
          const parent = path.parent;
          const args = parent.arguments;
          // 构建空对象
          let len = args.length;
          if (len <= 1) {
            return;
          }
          const params = t.objectExpression([]);
          for (let i = 1; i < len; i++) {
            params.properties.push(
              t.objectProperty(t.numericLiteral(i - 1), args[i])
            );
          }
          parent.arguments.splice(1);
          parent.arguments.push(params);
          path.skip(); // 跳过当前节点的子节点的遍历
        }
      },
    },
  };
};
