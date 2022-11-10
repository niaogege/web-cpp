"use strict";

var _class;

function _applyDecoratedDescriptor(
  target,
  property,
  decorators,
  descriptor,
  context
) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;
  if ("value" in desc || desc.initializer) {
    desc.writable = true;
  }
  desc = decorators
    .slice()
    .reverse()
    .reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }
  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }
  return desc;
}

let Toggle =
  ((_class = class Toggle {
    handleClick() {
      console.log("index.js: (4, 4)");
      console.log(this);
    }

    render() {}
  }),
  _applyDecoratedDescriptor(
    _class.prototype,
    "handleClick",
    [autobind],
    Object.getOwnPropertyDescriptor(_class.prototype, "handleClick"),
    _class.prototype
  ),
  _class);
const test1 = new Toggle();
test1.handleClick();
