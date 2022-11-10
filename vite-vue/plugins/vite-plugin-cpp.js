export default function CppPlugin(options) {
  return {
    name: "vite-plugin-cpp",
    load(id) {
      console.log(id, "vite-plugin-cpp");
      return null;
    },
  };
}
