// import Server from "react-dom/server";

import { render } from "https://cdn.skypack.dev/react-dom";
import React from "https://cdn.skypack.dev/react";
let Greet = () => <div>This is CPP HHHH</div>;

// console.log(Server.renderToString(Greet));
render(<Greet />, document.getElementById("root"));
