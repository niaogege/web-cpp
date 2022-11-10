eval("var a =11; exports.default = function test(a, b){return a + b}");

var add = require("add.js").default;
console.log(add(1, 2));

let moduleList = {
  "index.js": `
      var add = require('add.js').default;
      add(1, 2)
  `,
  "add.js": `
    exports.default = function add(a, b) {return a, b}
  `,
};

function require(file) {
  var exports = {};
  (function (exports, code) {
    eval(code);
  })(exports, "exports.default = function test(a, b){return a + b}");
  return exports;
}
var add = require("add.js");
add(1, 2);

(function (list) {
  function require(file) {
    var exports = {}(function test(exports, code) {
      eval(code);
    })(exports, list[file]);
  }
  require("index.js");
})(moduleList);
