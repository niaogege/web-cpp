export default function alias(options) {
  const entries = getEntries(options);
  return {
    // 传入三个参数 当前模块路径 引用当前模块路径 其他参数
    resolveId(importee, importer, resolveOptions) {
      console.log(importee, "importee");

      // 先检查能不能匹配别名规则
      const matchedEntry = entries.find((entry) =>
        matches(entry.find, importee)
      );
      // 如果不能匹配替换规则，或者当前模块是入口模块，则不会继续后面的别名替换流程
      if (!matchedEntry || !importerId) {
        // return null 后，当前的模块路径会交给下一个插件处理
        return null;
      }
      // 正式替换路径
      const updatedId = normalizeId(
        importee.replace(matchedEntry.find, matchedEntry.replacement)
      );
      return this.resolve(
        updatedId,
        importer,
        Object.assign({ skipSelf: true }, resolveOptions)
      ).then((resolved) => {
        // 替换后的路径即 updateId 会经过别的插件进行处理
        let finalResult = resolved;
        if (!finalResult) {
          // 如果其它插件没有处理这个路径，则直接返回 updateId
          finalResult = { id: updatedId };
        }
        return finalResult;
      });
    },
  };
}

function getEntries({ entries, customResolver }) {
  if (!entries) {
    return [];
  }

  const resolverFunctionFromOptions = resolveCustomResolver(customResolver);

  if (Array.isArray(entries)) {
    return entries.map((entry) => {
      return {
        find: entry.find,
        replacement: entry.replacement,
        resolverFunction:
          resolveCustomResolver(entry.customResolver) ||
          resolverFunctionFromOptions,
      };
    });
  }

  return Object.entries(entries).map(([key, value]) => {
    return {
      find: key,
      replacement: value,
      resolverFunction: resolverFunctionFromOptions,
    };
  });
}

function resolveCustomResolver(customResolver) {
  if (customResolver) {
    if (typeof customResolver === "function") {
      return customResolver;
    }
    if (typeof customResolver.resolveId === "function") {
      return customResolver.resolveId;
    }
  }
  return null;
}

function matches(pattern, importee) {
  if (pattern instanceof RegExp) {
    return pattern.test(importee);
  }
  if (importee.length < pattern.length) {
    return false;
  }
  if (importee === pattern) {
    return true;
  }
  // eslint-disable-next-line prefer-template
  return importee.startsWith(pattern + "/");
}
