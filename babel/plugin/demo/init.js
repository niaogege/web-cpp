const { declare } = require("@babel/helper-plugin-utils");
const importModule = require("@babel/helper-module-imports");

const firstBabelPlugin = declare((api, options, dirname) => {
  api.assertVersion(7);
  function injectCode(path, commentPath, state) {
    const pathBody = path.get("body");
    const leadingComments = commentPath.node.leadingComments;
    if (leadingComments) {
      const leadingCommentsMatched = leadingComments.filter((comment) =>
        comment.value.includes("@inject:")
      );
      leadingCommentsMatched.forEach((comment) => {
        const injectTypeMatchRes = comment.value.match(/\@inject:(\w+)/);
        // 匹配正确
        if (injectTypeMatchRes) {
          const injectType = injectTypeMatchRes[1];
          const sourceModuleList = Object.keys(options);
          if (sourceModuleList.includes(injectType)) {
            // 搜索一下 body里有没有 @code:xxx
            if (pathBody.isBlockStatement()) {
              const codeIndex = pathBody.node.body.findIndex(
                (block) =>
                  block.leadingComments &&
                  block.leadingComments.some((comment) =>
                    new RegExp(`@code:\s?${injectType}`).test(comment.value)
                  )
              );
              console.log(
                state.options[injectType],
                "state.options[injectType]"
              );
              console.log(
                api.template.statement(state.options[injectType])(),
                "API"
              );
              if (typeof state.options[injectType] === "string") {
                // 有函数体
                if (codeIndex === -1) {
                  pathBody.node.body.unshift(
                    api.template.statement(state.options[injectType])()
                  );
                } else {
                  pathBody.node.body.splice(
                    codeIndex,
                    0,
                    api.template.statement(state.options[injectType])()
                  );
                }
              } else {
                if (codeIndex === -1) {
                  pathBody.node.body.unshift(
                    api.template.statement(
                      `${state.options[injectType].identifierName}()`
                    )()
                  );
                } else {
                  pathBody.node.body.splice(
                    codeIndex,
                    0,
                    api.template.statement(
                      `${state.options[injectType].identifierName}()`
                    )()
                  );
                }
              }
            } else {
              // 无函数体
              if (typeof state.options[injectType] === "string") {
                // 无函数体
                const ast = api.template.statement(
                  `{${state.options[injectType]};return PREV_BODY;}`
                )({ PREV_BODY: pathBody.node });
                pathBody.replaceWith(ast);
              } else {
                // 无函数体
                const ast = api.template.statement(
                  `{${state.options[injectType].identifierName}();return PREV_BODY;}`
                )({ PREV_BODY: pathBody.node });
                pathBody.replaceWith(ast);
              }
            }
          }
        }
      });
    }
  }
  return {
    visitor: {
      Program: {
        enter(path, state) {
          // 拷贝一份options 挂在 state 上,  原本的 options 不能操作
          state.options = JSON.parse(JSON.stringify(options));
          path.traverse({
            ImportDeclaration(curPath) {
              console.log(curPath, "curPath");
              const requirePath = curPath.get("source").node.value;
              console.log(requirePath, "requirePath");
              Object.keys(state.options).forEach((key) => {
                const option = state.options[key];
                if (option.require === requirePath) {
                  const specifiers = curPath.get("specifiers");
                  specifiers.forEach((specifier) => {
                    if (option.kind === "default") {
                      // 判断导入类型
                      if (specifier.isImportDefaultSpecifier()) {
                        // 找到已有 default 类型的引入
                        if (specifier.node.imported.name === key) {
                          // 挂到 identifierName 以供后续调用获取
                          option.identifierName = specifier
                            .get("local")
                            .toString();
                        }
                      }
                    } else if (option.kind === "named") {
                      if (specifier.isImportSpecifier()) {
                        // 找到已有 default 类型的引入
                        if (specifier.node.imported.name === key) {
                          option.identifierName = specifier
                            .get("local")
                            .toString();
                        }
                      }
                    }
                  });
                }
              });
            },
          });
          // 处理未被引入的包
          Object.keys(state.options).forEach((key) => {
            const option = state.options[key];
            // 需要require 并且未找到 identifierName 字段
            if (option.require && !option.identifierName) {
              // default形式
              if (option.kind === "default") {
                // 增加 default 导入
                // 生成一个随机变量名, 大致上是这样 _log2
                option.identifierName = importModule.addDefault(
                  path,
                  option.require,
                  {
                    nameHint: path.scope.generateUid(key),
                  }
                ).name;
              }

              // named形式
              if (option.kind === "named") {
                option.identifierName = importModule.addNamed(
                  path,
                  key,
                  option.require,
                  {
                    nameHint: path.scope.generateUid(key),
                  }
                ).name;
              }
            }

            // 如果没有传递 require 会认为是全局方法，不做导入处理
            if (!option.require) {
              option.identifierName = key;
            }
          });
        },
      },
      FunctionDeclaration(path, state) {
        injectCode(path, path, state);
        // const pathBody = path.get("body");
        // const leadingComments = path.node.leadingComments;
        // if (leadingComments && leadingComments.length) {
        //   // 匹配到有@inject
        //   const lastComment = leadingComments.filter((comment) =>
        //     /\@inject:(\w+)/.test(comment.value)
        //   );
        //   lastComment.forEach((comment) => {
        //     const injectTypeMatchRes = comment.value.match(/\@inject:(\w+)/);
        //     if (injectTypeMatchRes) {
        //       const injectType = injectTypeMatchRes[1]; // log
        //       // 获取插件的参数
        //       const sourceModuleList = Object.keys(options); // [log]
        //       if (sourceModuleList.includes(injectType)) {
        //         console.log(pathBody.isBlockStatement(), "pathBody");
        //         if (pathBody.isBlockStatement()) {
        //           const codeBody = pathBody.node.body;
        //           const codeIndex = codeBody.findIndex((block) => {
        //             return (
        //               block &&
        //               block.leadingComments &&
        //               block.leadingComments.some((comment) =>
        //                 new RegExp(`@code:\s?${injectType}`).test(comment.value)
        //               )
        //             );
        //           });
        //           console.log(
        //             state.options,
        //             "state.options",
        //             state.options[injectType]
        //           );
        //           const identifierName = api.template.statement("log();")();
        //           if (typeof state.options[injectType] === "string") {
        //             if (codeIndex > -1) {
        //               pathBody.node.body.splice(codeIndex, 0, identifierName);
        //             } else {
        //               pathBody.node.body.unshift(identifierName);
        //             }
        //           } else {
        //             if (codeIndex === -1) {
        //               pathBody.node.body.unshift(identifierName);
        //             } else {
        //               pathBody.node.body.splice(codeIndex, 0, identifierName);
        //             }
        //           }
        //         } else {
        //           // 无函数体
        //           if (typeof state.options[injectType] === "string") {
        //             // 无函数体
        //             const ast = api.template.statement(
        //               `{${state.options[injectType]};return PREV_BODY;}`
        //             )({ PREV_BODY: pathBody.node });
        //             pathBody.replaceWith(ast);
        //           } else {
        //             // 无函数体
        //             const ast = api.template.statement(
        //               `{${state.options[injectType].identifierName}();return PREV_BODY;}`
        //             )({ PREV_BODY: pathBody.node });
        //             pathBody.replaceWith(ast);
        //           }
        //         }
        //       }
        //     }
        //   });
        // }
      },
    },
  };
});

module.exports = firstBabelPlugin;
