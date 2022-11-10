function myFirstPlugin() {
  return {
    name: "cpp-plugin",
    resolveId(source) {
      console.log("resolved");
      return source;
    },
    load(id) {
      console.log(id, "Load id");
      return null;
    },
  };
}

export default myFirstPlugin;
