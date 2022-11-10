const { declare } = require("@babel/helper-plugin-utils");
const importModule = require("@babel/helper-module-imports");

const autoUbtPlugin = declare(
  ({ types: t, template, assertVersion }, options) => {
    assertVersion(7); // 判断 babel 版本是否是指定的版本
    return {
      visitor: {
        Program: {
          enter(path, state) {
            path.traverse({
              ImportDeclaration(curPath) {
                const requirePath = curPath.get("source").node.value;
                if (requirePath === options.trackerPath) {
                  const specifierPath = curPath.get("specifiers.0");
                  if (specifierPath.isImportSpecifier()) {
                    state.trackerImportId = specifierPath.toString();
                  } else if (specifierPath.isImportNamespaceSpecifier()) {
                    state.trackerImportId = specifierPath
                      .get("local")
                      .toString(); // tracker 模块的 id
                  }
                }
              },
            });
            if (!state.trackerImportId) {
              state.trackerImportId = importModule.addDefault(path, "tracker", {
                nameHint: path.scope.generateUid("cpp"),
              }).name;
              state.trackerAST = template.statement(
                `${state.trackerImportId}()`
              )();
            }
          },
        },
        "FunctionDeclaration|ArrowFunctionExpression|FunctionExpression|ClassMethod":
          function (path, state) {
            const bodyPath = path.get("body");
            if (bodyPath.isBlockStatement()) {
              bodyPath.node.body.unshift(state.trackerAST);
            } else {
              const ast = template.statement(
                `{${state.trackerImportId}();return CPP;}`
              )({ CPP: bodyPath.node });
              bodyPath.replaceWith(ast);
            }
          },
      },
    };
  }
);

module.exports = autoUbtPlugin;
