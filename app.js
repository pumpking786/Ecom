const http = require("http");
const server = http.createServer((request, response) => {});

server.listen(3000, "127.1.1.2", (err) => {
  if (!err) {
    console.log("Server is listening to port: 3000");
    console.log("Press CTRL+C to disconnect server");
  }
});
