console.log("cpp");
function func() {
  console.info(2);
}

export default class Clazz {
  say() {
    console.debug(3);
  }
  render() {
    return <div>{console.error(4)}</div>;
  }
}
