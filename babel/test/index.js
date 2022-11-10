import plugin from "../plugin/index";
import pluginTester from "babel-plugin-tester";
pluginTester({
  plugin,
  tests: {
    "no-params": {
      code: `spliceText('有趣的灵魂')`,
      snapshot: true,
    },
    "has-params": {
      code: "",
      snapshot: true,
    },
  },
});
