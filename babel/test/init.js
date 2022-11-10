import plugin from "../plugin/init";
import pluginTester from "babel-plugin-tester";
pluginTester({
  plugin,
  tests: {
    "no-params": {
      code: `
      // @inject:log
      function fn() {
        console.log(1);
        // @inject:code
        console.log(2);
      }
      `,
      snapshot: true,
    },
  },
});

// before
// @inject:log
// function fn() {
//   console.log(1);
//   // @inject:code
//   console.log(2);
// }

// // after
// import log from "xxx";
// function fn() {
//   console.log(1);
//   log();
//   console.log(2);
// }
