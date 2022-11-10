const plugin = (option) => ({
  postcssPlugin: "postcss-plugin-pxToRem",
  Once(root) {
    console.log(option, "option");
    const { rootValue } = option;
    // Transform CSS AST here
    root.walkRules((rule) => {
      // Transform each rule here
      rule.walkDecls((decl) => {
        // Transform each property declaration here
        if (decl.value.indexOf("px") > -1) {
          const arr = decl.value.split("px");
          const num = arr[0];
          decl.value = parseInt(num / rootValue) + "rem";
          console.log(decl);
        }
      });
    });
  },
});

plugin.postcss = true;

module.exports = plugin;
