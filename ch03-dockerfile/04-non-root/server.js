import { createServer } from "node:http";
import { userInfo } from "node:os";

const server = createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`Running as: ${userInfo().username}\n`);
});

server.listen(3000, () => {
  console.log(`Listening on 3000 as ${userInfo().username}`);
});
