import { createServer } from "node:http";
import pg from "pg";
import { createClient } from "redis";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

const server = createServer(async (req, res) => {
  if (req.url === "/healthz") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK\n");
    return;
  }
  if (req.url === "/users") {
    const cached = await redis.get("users");
    if (cached) {
      res.writeHead(200, { "Content-Type": "application/json", "X-Cache": "hit" });
      res.end(cached);
      return;
    }
    const result = await pool.query("SELECT id, name FROM users ORDER BY id");
    const body = JSON.stringify(result.rows);
    await redis.set("users", body, { EX: 30 });
    res.writeHead(200, { "Content-Type": "application/json", "X-Cache": "miss" });
    res.end(body);
    return;
  }
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found\n");
});

server.listen(3000, () => {
  console.log("Listening on 3000");
});
