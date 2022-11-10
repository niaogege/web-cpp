(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  var Cpp = {
    name: "CPP",
  };

  // export * from './getTime'

  const add = (a, b) => a + b;

  // import { getCurrentTime } from "./utils/index.js";
  console.log(add(1, 2));

  // import("./utils").then(({ add }) => {
  //   console.log(add(1, 2));
  // });

  console.log(Cpp, "CppCpp");

}));
