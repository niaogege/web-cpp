const { SyncHook } = require("tapable");
const sh = new SyncHook(["name"]);

sh.tap("one", (name) => {
  console.log(name, 1);
});
sh.tap("second", (name) => {
  console.log(name, 2);
});
sh.call("tapable");
// tapable 1
// tapable 2
