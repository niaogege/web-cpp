import { useState } from "react";
import * as jsxRuntime from "react/jsx-runtime.js";
const reactLogo = "/assets/react.35ef61ed.svg";
const App$1 = "";
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
function App(props) {
  var _a;
  const [count, setCount] = useState(0);
  console.log(props, "PROPS");
  return /* @__PURE__ */ jsxs("div", {
    className: "App",
    children: [/* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("a", {
        href: "https://vitejs.dev",
        target: "_blank",
        children: /* @__PURE__ */ jsx("img", {
          src: "/vite.svg",
          className: "logo",
          alt: "Vite logo"
        })
      }), /* @__PURE__ */ jsx("a", {
        href: "https://reactjs.org",
        target: "_blank",
        children: /* @__PURE__ */ jsx("img", {
          src: reactLogo,
          className: "logo react",
          alt: "React logo"
        })
      })]
    }), /* @__PURE__ */ jsx("h1", {
      children: (_a = props == null ? void 0 : props.data) == null ? void 0 : _a.user
    }), /* @__PURE__ */ jsxs("div", {
      className: "card",
      children: [/* @__PURE__ */ jsxs("button", {
        onClick: () => setCount((count2) => count2 + 1),
        children: ["count is ", count]
      }), /* @__PURE__ */ jsxs("p", {
        children: ["Edit ", /* @__PURE__ */ jsx("code", {
          children: "src/App.tsx"
        }), " and save to test HMR"]
      })]
    }), /* @__PURE__ */ jsx("p", {
      className: "read-the-docs",
      children: "Click on the Vite and React logos to learn more"
    })]
  });
}
const index = "";
function ServerEntry(props) {
  return /* @__PURE__ */ jsx(App, {
    data: {
      user: "cpp"
    }
  });
}
async function fetchData() {
  return {
    user: "cpp"
  };
}
export {
  ServerEntry,
  fetchData
};
//# sourceMappingURL=entry-server.js.map
