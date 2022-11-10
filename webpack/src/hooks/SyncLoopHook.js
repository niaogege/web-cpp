const { SyncLoopHook } = require("tapable");
const hook = new SyncLoopHook(["name"]);

let total = 0;
hook.tap("fn1", (arg) => {
  console.log("exec fn1.");
  return ++total === 3 ? undefined : "fn1";
});
hook.tap("fn2", (arg) => {
  console.log("exec fn2.");
});
hook.call("hello");

// 运行结果：
// exec fn1.
// exec fn1.
// exec fn1.
// exec fn2.
