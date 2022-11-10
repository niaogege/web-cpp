// http-consult.js
const http = require("http");
const url = require("url");
const responseData = {
  ID: "zhangsan",
  Name: "张三",
  RegisterDate: "2020年3月1日",
};

function toHTML(data) {
  return `
    <ul>
      <li><span>账号：</span><span>${data.ID}</span></li>
      <li><span>昵称：</span><span>${data.Name}</span></li>
      <li><span>注册时间：</span><span>${data.RegisterDate}</span></li>
    </ul>
  `;
}

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(`http://${req.headers.host}${req.url}`);
  if (pathname === "/") {
    const accept = req.headers.accept; // 获取Accept信息
    if (accept.indexOf("application/json") >= 0) {
      console.log("11");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(responseData));
    } else {
      console.log("22");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(toHTML(responseData));
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Not Found</h1>");
  }
});

server.listen(8081, () => {
  console.log("server on:", server.address());
});
