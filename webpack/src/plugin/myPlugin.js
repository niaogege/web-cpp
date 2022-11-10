const Compiler = require("../compiler");

class MyPlugin {
  constructor() {}
  apply(compiler) {
    compiler.hooks.break.tap("WarningLampPlugin", () => {
      console.log("WarningLampPlugin");
    });

    compiler.hooks.accelerate.tap("logPlugin", (speed) => {
      console.log("logPlugin", speed);
    });

    // 绑定异步钩子
    compiler.hooks.calculateRoutes.tapPromise(
      "cal tapPromise",
      (source, target, routesList, callback) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(`tapPromise to ${source}-${target}-${routesList}`);
            resolve();
          }, 2000);
        });
      }
    );

    // 绑定异步钩子 tapAsync
    compiler.hooks.asyncTest.tapAsync("asyncTest tapAsync", (name, cb) => {
      setTimeout(() => {
        console.log(("asyncTest:", name));
        cb();
      }, 1000);
    });
  }
}

const myPlugin = new MyPlugin();

const options = {
  plugins: [myPlugin],
};

let compiler = new Compiler(options);
compiler.run();
