"use strict";

var _class;

let MyClass = cppD(_class = class MyClass {}) || _class;

function cppD(targetClass) {
  targetClass.name = "cpp";
}

console.log("index.js: (8, 0)")
console.log(MyClass.name);
