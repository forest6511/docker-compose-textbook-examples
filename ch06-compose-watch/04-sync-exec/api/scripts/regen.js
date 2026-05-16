const fs = require("fs");
const path = require("path");

const raw = fs.readFileSync("/app/schema.txt", "utf8").trim();
const out = { fields: raw.split(/\s+/).filter(Boolean) };

fs.mkdirSync("/app/generated", { recursive: true });
fs.writeFileSync(
  "/app/generated/schema.json",
  JSON.stringify(out, null, 2) + "\n",
);

console.log("regen.js: wrote /app/generated/schema.json");
