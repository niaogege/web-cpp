const { AsyncParallelHook } = require("tapable");

const sh = new AsyncParallelHook(["name"]);

console.time("AsyncParallelHook");

sh.tapAsync("one", (name, cb) => {
  console.log("one start");
  setTimeout(() => {
    console.log("one done ", name);
    cb(11);
  }, 4000);
});
sh.tapPromise("two", (name) => {
  return new Promise((resolve, reject) => {
    console.log("two start");
    setTimeout(() => {
      console.log("two done ", name);
      resolve();
    }, 1000);
  });
});

sh.tapPromise("three", (name) => {
  return new Promise((resolve, reject) => {
    console.log("333 start");
    setTimeout(() => {
      console.log("333 done", name);
    }, 1000);
  });
});
// 执行
sh.promise("tapable").then(() => {
  console.log("all done");
  console.timeEnd("AsyncParallelHook");
});

//one start
//two start
//two done  tapable
//one done  tapable
//all done
//AsyncParallelHook: 4.015s
