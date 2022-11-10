const { SyncBailHook } = require("tapable");
const sh = new SyncBailHook(["name"]);

sh.tap("one", (name) => {
  console.log("one", name);
  return null;
});
sh.tap("two", (name) => {
  console.log("two");
});
sh.tap("three", (name) => {
  console.log("three");
});
sh.callAsync("tapable", (error) => {
  if (error) console.log(error);
  console.log("all done");
});

//two
//all done
