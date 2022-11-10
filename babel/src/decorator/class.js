@cppD
class MyClass {}

function cppD(targetClass) {
  targetClass.name = "cpp";
}

console.log(MyClass.name); //  'cpp'
