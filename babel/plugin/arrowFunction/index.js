module.exports = function ({ types: t, template }, options, dirname) {
  return {
    visitor: {
      ArrowFunctionExpression(path, state) {
        const node = path.node;
        // 拿到函数参数体
        const params = node.params;
        // 拿到函数体
        let body = node.body;
        // 函数返回语句
        if (!t.isBlockStatement(body)) {
          const r = t.returnStatement(body);
          // 花括号 {}
          body = t.blockStatement([r]);
        }
        const f = t.functionExpression(null, params, body, false, false);
        // 构造函数体
        // 如何构造FunctionExpression
        // 以及如何把函数名和函数体插入进去
        // path.repaceWith(t.FunctionDeclaration(path, state));
        path.replaceWith(f);
      },
    },
  };
};
