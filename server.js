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

app.get("/posts", async (req, res) => {
  try {
    const all = await Item.find();
    res.json(all);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/posts", async (req, res) => {
  const item = new Item({
    item: req.body.item,
  });
  try {
    const newItem = await item.save();
    res.json(newItem);
  } catch (err) {
    res.json({ message: err });
  }
});

app.get("/posts/:postId", async (req, res) => {
  try {
    let myPost = await Item.findById(req.params.postId);
    res.json(myPost);
  } catch (err) {
    res.json({ message: err });
  }
});

app.delete("/posts/:postId", async (req, res) => {
  try {
    let deleted = await Item.deleteOne({ _id: req.params.postId });
    res.json(deleted);
  } catch (err) {
    res.json({ message: err });
  }
});

app.patch("/posts/:postId", async (req, res) => {
  try {
    let updated = await Item.updateOne(
      { _id: req.params.postId },
      { $set: { item: req.body.item } }
    );
    res.json(updated);
  } catch (err) {
    res.json({ message: err });
  }
});

app.listen(PORT);

//
