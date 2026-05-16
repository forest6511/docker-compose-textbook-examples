const express = require("express");
const fs = require("fs");
const app = express();

app.get("/schema", (req, res) => {
  try {
    const body = fs.readFileSync("/app/generated/schema.json", "utf8");
    res.type("application/json").send(body);
  } catch (e) {
    res.status(503).send("schema not generated yet\n");
  }
});

app.listen(3000, () => console.log("listening on :3000"));
