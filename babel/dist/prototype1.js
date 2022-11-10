"use strict";

var _class;

const withSpeak = function (targetClass) {
  const prototype = targetClass.prototype;

  prototype.speak = function () {
    console.log("I can speak ", this.language);
  };
};

let Student =
  withSpeak(
    (_class = class Student {
      constructor(language) {
        this.language = language;
      }
    })
  ) || _class;

const student1 = new Student("Chinese");
const student2 = new Student("English");
student1.speak(); // I can speak  Chinese

student2.speak();
