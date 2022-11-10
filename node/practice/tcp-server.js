const net = require("net");
const server = net
  .createServer((socket) => {
    socket.on("data", (data) => {
      const matched = data.toString("utf-8").match(/^GET ([/\w]+) HTTP/);
      if (matched) {
        const path = matched[1];
        if (path === "/") {
          //如果路径是'/'，返回hello world、状态是200
          socket.write(responseData("<h1>Hello world</h1>"));
        } else {
          // 否则返回404状态
          socket.write(responseData("<h1>Not Found</h1>", 404, "NOT FOUND"));
        }
      }
      console.log(`DATA:\n\n${data}`);
    });

    socket.on("close", () => {
      console.log("connection closed, goodbye!\n\n\n");
    });
  })
  .on("error", (err) => {
    // handle errors here
    throw err;
  });

function responseData(str, status = 200, desc = "OK") {
  return `HTTP/1.1 ${status} ${desc}
  Connection: keep-alive
  Date: ${new Date()}
  Content-Length: ${str.length}
  Content-Type: text/html

  ${str}`;
}
server.listen(
  {
    port: 8081,
    host: "0.0.0.0",
  },
  () => {
    console.log("opened server on", server.address());
  }
);
