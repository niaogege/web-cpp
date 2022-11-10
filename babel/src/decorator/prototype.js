const withSpeak = (targetClass) => {
  const prototype = targetClass.prototype;
  prototype.speak = function () {
    console.log("I can speak ", this.language);
  };
};
@withSpeak
class Student {
  constructor(language) {
    this.language = language;
  }
}
const student1 = new Student("Chinese");
const student2 = new Student("English");
student1.speak(); // I can speak  Chinese
student2.speak();
