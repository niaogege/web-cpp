const selectorParser = require("postcss-selector-parser");

const hasOwnProperty = Object.prototype.hasOwnProperty;

const plugin = (options = {}) => {
  const generateScopedName =
    (options && options.generateScopedName) || plugin.generateScopedName;
  return {
    postcssPlugin: "postcss-modules-scope",
    Once(root, helpers) {
      const exports = {};
      function exportScopedName(name, rawName) {
        const scopedName = generateScopedName(
          rawName ? rawName : name,
          root.source.input.from,
          root.source.input.css
        );
        exports[name] = exports[name] || [];
        if (exports[name].indexOf(scopedName) < 0) {
          exports[name].push(scopedName);
        }
        return scopedName;
      }

      // 遍历node
      function traverseNode(node) {
        switch (node.type) {
          case "root":
          case "selector": {
            node.each(traverseNode);
            break;
          }
          case "id":
          case "class":
            exports[node.value] = [node.value];
            break;
          case "pseudo":
            if (node.value === ":local") {
              const selector = localizeNode(node.first, node.spaces);
              node.replaceWith(selector);
              return;
            }
        }
        return node;
      }

      // Find any :import and remember imported names
      const importedNames = {};
      root.walkRules(/^:import\(.+\)$/, (rule) => {
        rule.walkDecls((decl) => {
          importedNames[decl.prop] = true;
        });
      });

      function localizeNode(node) {
        switch (node.type) {
          case "class":
            return selectorParser.className({
              value: exportScopedName(
                node.value,
                node.raws && node.raws.value ? node.raws.value : null
              ),
            });
          case "id": {
            return selectorParser.id({
              value: exportScopedName(
                node.value,
                node.raws && node.raws.value ? node.raws.value : null
              ),
            });
          }
          case "selector":
            node.nodes = node.map(localizeNode);
            return node;
        }
      }
      root.walkRules((rule) => {
        // parse 选择器为 AST
        const parsedSelector = selectorParser().astSync(rule);
        console.log(parsedSelector, "parsedSelector");
        // 遍历选择器 AST 并实现转换
        rule.selector = traverseNode(parsedSelector.clone()).toString();

        rule.walkDecls(/composes|compose-with/i, (decl) => {
          // 处理 compose
          // 因为选择器的 AST 是 Root-Selector-Xx 的结构，所以要做下转换
          const localNames = parsedSelector.nodes.map((node) => {
            return node.nodes[0].first.first.value;
          });
          const classes = decl.value.split(/\s+/);
          classes.forEach((className) => {
            const global = /^global\(([^)]+)\)$/.exec(className);

            if (global) {
              localNames.forEach((exportedName) => {
                exports[exportedName].push(global[1]);
              });
            } else if (hasOwnProperty.call(importedNames, className)) {
              localNames.forEach((exportedName) => {
                exports[exportedName].push(className);
              });
            } else if (hasOwnProperty.call(exports, className)) {
              localNames.forEach((exportedName) => {
                exports[className].forEach((item) => {
                  exports[exportedName].push(item);
                });
              });
            } else {
              throw decl.error(
                `referenced class name "${className}" in ${decl.prop} not found`
              );
            }
          });
          decl.remove();
        });
      });

      root.walkAtRules(/keyframes$/i, (atRule) => {
        const localMatch = /^:local\((.*)\)$/.exec(atRule.params);

        if (localMatch) {
          atRule.params = exportScopedName(localMatch[1]);
        }
      });

      // If we found any :locals, insert an :export rule
      console.log(exports, "exports");
      const exportedNames = Object.keys(exports);

      if (exportedNames.length > 0) {
        const exportRule = helpers.rule({ selector: ":export" });

        exportedNames.forEach((exportedName) =>
          exportRule.append({
            prop: exportedName,
            value: exports[exportedName].join(" "),
            raws: { before: "\n  " },
          })
        );
        root.append(exportRule);
      }
    },
  };
};

plugin.postcss = true;

plugin.generateScopedName = function (name, path = "") {
  const sanitisedPath = path
    .replace(/\.[^./\\]+$/, "")
    .replace(/[\W_]+/g, "_")
    .replace(/^_|_$/g, "");

  return `_${sanitisedPath}__${name}`.trim();
};
module.exports = plugin;
