"use strict";

// function spliceText(...arg) {
//   return arg[0].replace(/(\{(\d)\})/g, (...args) => {
//     return arg[Number(args[2] + 1)];
//   });
// }
// spliceText("我有一只小{0}，我从来都不{1}", "毛驴", "骑"); // 有一只小毛驴，我从来都不骑
// function spliceTextCopy(str, obj) {
//   return str.replace(/(\{(\d)\})/g, (...args) => {
//     return obj[args[2]];
//   });
// }
// spliceTextCopy("我有一只小{0}，我从来都不{1}", {
//   0: "毛驴",
//   1: "骑车",
// });
// @inject:log
function fn() {
  console.log(1); // @code:log

  log();
  console.log(2);
}
