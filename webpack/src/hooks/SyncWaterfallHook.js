const { SyncWaterfallHook } = require("tapable");

const hook = new SyncWaterfallHook(["msg"]);
hook.tap("fn1", (arg) => {
  return `${arg}, fn1`;
});
hook.tap("fn2", (arg) => {
  return `${arg}, fn2 cpp`;
});
console.log(hook.call("hello"));

// 运行结果：
// hello, fn1, fn2 cpp
