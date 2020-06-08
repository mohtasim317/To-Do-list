const express = require("express");
const path = require("path");
const app = express();
const PORT = 1738;
const mongoose = require("mongoose");
const Item = require("./models/Item");
require("dotenv/config");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "./static")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/posts", (req, res) => {
  res.send("We're on posts");
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("we connected");
});

app.post("/posts", (req, res) => {
  const item = new Item({
    item: req.body.item,
  });
  item
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

app.listen(PORT);

//
