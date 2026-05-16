import { createServer } from "node:http";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const server = createServer(async (req, res) => {
  if (req.url === "/healthz") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK\n");
    return;
  }
  if (req.url === "/users") {
    try {
      const result = await pool.query("SELECT id, name FROM users ORDER BY id");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result.rows));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(`DB error: ${err.message}\n`);
    }
    return;
  }
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found\n");
});

server.listen(3000, () => {
  console.log("Listening on 3000");
});
