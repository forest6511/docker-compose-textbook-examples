const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from watch v2");
});

app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`API listening on ${port}`);
});
