const { SyncHook, AsyncParallelHook, AsyncSeriesHook } = require("tapable");

class Compiler {
  constructor(options) {
    this.hooks = {
      accelerate: new SyncHook(["newSpeed"]),
      break: new SyncHook(),
      calculateRoutes: new AsyncParallelHook([
        "source",
        "target",
        "routesList",
      ]),
      asyncTest: new AsyncSeriesHook(["name"]),
    };
    let plugins = options.plugins;
    console.log(plugins, "PLUGINs");
    if (plugins && plugins.length) {
      plugins.forEach((plugin) => plugin.apply(this));
    }
  }
  run() {
    console.time("cost");
    console.time("async");
    this.accelerate("hello");
    this.break();
    this.calculateRoutes("i", "like", "tapable");
    this.asyncTest("wmh");
  }
  accelerate(param) {
    this.hooks.accelerate.call(param);
  }
  break() {
    this.hooks.break.call();
  }
  calculateRoutes() {
    const args = Array.from(arguments);
    this.hooks.calculateRoutes.callAsync(...args, (err) => {
      console.timeEnd("cost");
      if (err) console.log(err);
    });
  }
  asyncTest() {
    const args = Array.from(arguments);
    this.hooks.asyncTest.callAsync(...args, (err) => {
      console.timeEnd("async");
      if (err) console.log(err);
    });
  }
}

module.exports = Compiler;
