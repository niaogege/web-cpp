// function spliceText(...args) {
//   return args[0].replace(/(\{(\d)\})/g, (...args2) => {
//     return args[Number(args2[2]) + 1];
//   });
// }

spliceText("我有一只小{0}，我从来都不{1}", "毛驴", "骑"); // 有一只小毛驴，我从来都不骑
spliceText("我叫{0}，今年{1}岁，特长是{2}", "小余", 18, "睡觉"); // 叫小余，今年18岁，特长是睡觉
spliceText("有趣的灵魂");
