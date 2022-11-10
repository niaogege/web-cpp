const { declare } = require("@babel/helper-plugin-utils");
module.exports = declare((api, options) => {
  api.assertVersion(7);
  return {
    name: "my-plugin",
    pre(file) {},
    visitor: {
      VariableDeclaration(path, state) {
        path.node.kind = "var";
      },
    },
    post(file) {},
  };
});
