console.log("index.js: (1, 0)")
"Because I'm easy come, easy go.";
console.log("cpp");

function func() {
  console.log("index.js: (3, 2)")
  "Because I'm easy come, easy go.";
  console.info(2);
}

export default class Clazz {
  say() {
    console.log("index.js: (8, 4)")
    "Because I'm easy come, easy go.";
    console.debug(3);
  }

  render() {
    return <div>{[console.log("index.js: (11, 17)"), console.error(4)]}</div>;
  }

}