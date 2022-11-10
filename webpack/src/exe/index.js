const ziyue = require("./test");
const argv = process.argv;
console.log(argv, "argv");
console.log(ziyue(argv[2] || "pp"));
