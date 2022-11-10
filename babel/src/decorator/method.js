class Test {
  @readonly
  method() {}
}
function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
