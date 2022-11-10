class Person {
  @readonly name = "cpp";
}
function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
const person = new Person();
person.name = "wmh";
console.log(person.name);
