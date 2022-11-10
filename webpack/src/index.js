let div = document.createElement("div");
document.body.appendChild(div);

let input = document.createElement("input");
document.body.appendChild(input);

let render = () => {
  let title = require("./title.js");
  div.innerHTML = title;
};

render();
