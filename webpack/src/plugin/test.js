const { SyncHook, AsyncParallelHook, AsyncSeriesHook } = require("tapable");

class Car {
  constructor() {
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
  }
}

const myCar = new Car();
// 绑定同步钩子
myCar.hooks.break.tap("WarningLampPlugin", () => {
  console.log("WarningLampPlugin");
});

myCar.hooks.accelerate.tap("logPlugin", (speed) => {
  console.log("logPlugin", speed);
});

// 绑定异步钩子
myCar.hooks.calculateRoutes.tapPromise(
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
myCar.hooks.asyncTest.tapAsync("asyncTest tapAsync", (name, cb) => {
  setTimeout(() => {
    console.log(("asyncTest:", name));
    cb();
  }, 1000);
});

// 执行同步钩子
myCar.hooks.break.call();
myCar.hooks.accelerate.call("cpp accelerate");

console.time("cost");
console.time("async");
// 执行异步钩子
myCar.hooks.calculateRoutes.promise("cpp", "is", "shabi").then((res) => {
  console.timeEnd("cost");
});

myCar.hooks.asyncTest.callAsync("cpp", (err) => {
  console.timeEnd("async");
  if (err) {
    throw err;
  }
});
