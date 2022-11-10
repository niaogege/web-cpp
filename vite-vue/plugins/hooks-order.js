export default function HooksOrder() {
  return {
    name: "hooks-order",
    // Vite 独有钩子
    config(cf) {
      console.log("config");
    },
    // Vite 独有钩子
    configResolved(resolvedCofnig) {
      console.log("configResolved");
    },
    // common
    options(opts) {
      console.log("options");
      return opts;
    },
    // vite
    configureServer(server) {
      console.log("configureServer");
      // setTimeout(() => {
      //   // 手动退出进程
      //   process.kill(process.pid, "SIGTERM");
      // }, 3000);
    },
    // 通用钩子
    buildStart() {
      console.log("buildStart");
    },
    // 通用钩子
    buildEnd() {
      console.log("buildEnd");
    },
    // 通用钩子
    closeBundle() {
      console.log("closeBundle");
    },
  };
}
