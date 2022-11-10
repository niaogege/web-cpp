module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: 99,
        },
        debug: true,
        useBuiltIns: "usage",
        corejs: "3.6.4",
      },
    ],
  ],
  plugins: [
    // "@babel/plugin-transform-runtime",
    "./plugin/insertCode/index.js",
    "./plugin/arrowFunction/index.js",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-class-properties",
  ],
};
