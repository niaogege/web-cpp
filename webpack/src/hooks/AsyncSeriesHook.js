const { AsyncSeriesHook } = require("tapable");

const hook = new AsyncSeriesHook();
hook.tapAsync("fn1", (name, cb) => {
  console.log("call fn1", name);
  setTimeout(() => {
    name();
  }, 1000);
});
hook.tapAsync("fn2", (name, cb) => {
  console.log("call fn2", name, cb);
});

hook.tapAsync("fn3", (cb) => {
  console.log("fn3", cb);
});

hook.callAsync("cpp", (err) => {
  console.log("last");
});

// 输出结果：
// call fn1
// call fn2 // 1000ms 后执行
