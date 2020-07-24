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

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("we connected");
  }
);

app.get("/posts", (req, res) => {
  res.send("hello from posts");
});

app.post("/posts", (req, res) => {
  const item = new Item({
    item: req.body.item,
  });
  try {
    const newItem = item.save();
    res.json(newItem);
  } catch (err) {
    res.json({ message: err });
  }
});

app.listen(PORT);

//
