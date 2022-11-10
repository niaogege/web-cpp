const plugin = (option) => {
  const pxReg = /(\d+)px/gi;
  const { rootValue } = option;
  return {
    postcssPlugin: "postcss-plugin-pxTorem",
    Declaration(dec) {
      if (dec.value.indexOf("px") > -1) {
        dec.value = dec.value.replace(pxReg, (matchStr, num) => {
          return num / rootValue + "rem";
        });
      }
    },
  };
};

module.exports = plugin;
