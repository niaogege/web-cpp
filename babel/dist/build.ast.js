"use strict";

var _log4js = require("log4js");

// import tt from "log4js";
// @inject:log
function fn() {
  console.log(1); //@code:log

  (0, _log4js.log)();
  console.log(2);
}
