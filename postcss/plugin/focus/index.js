function hasAlready(parent, selector) {
  return parent.some((i) => {
    return i.type === "rule" && i.selectors.includes(selector);
  });
}
const plugin = () => ({
  postcssPlugin: "postcss-cpp-plugin",
  Once(root) {
    // Transform CSS AST here
    root.walkRules((rule) => {
      if (rule.selector.includes(":hover")) {
        let focuses = [];
        for (let selector of rule.selectors) {
          if (selector.includes(":hover")) {
            let replaced = selector.replace(/:hover/g, ":focus");
            if (!hasAlready(rule.parent, replaced)) {
              focuses.push(replaced);
            }
          }
        }
        // 步骤3
        if (focuses.length) {
          rule.selectors = rule.selectors.concat(focuses);
        }
      }
    });
  },
});

plugin.postcss = true;

module.exports = plugin;
