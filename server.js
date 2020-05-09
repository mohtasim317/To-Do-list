const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const PORT = 1738;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "./static")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/*", (req, res) => {
  throw new Error("Oops something broke :/");
});

app.listen(PORT);
