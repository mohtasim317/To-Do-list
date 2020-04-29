const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const itemModel = require("./models/ItemModel");
const bodyParser = require("body-parser");
const app = express();
const PORT = 1738;

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://todolister:todolist@cluster0-1rclx.mongodb.net/test?retryWrites=true&w=majority"
);
app.use("/static", express.static(path.join(__dirname, "./static")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/items", async (req, res) => {
  const items = await itemModel.find({});
  try {
    res.send(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/item", (req, res) => {
  const item = new itemModel({ item: req.body });
  console.log(item);
  item.save(function (err, res) {
    if (err) {
      console.log(err);
      res.send({
        message: "something went wrong",
      });
    } else {
      res.send({
        message: "item added",
      });
    }
  });
});

app.get("/*", (req, res) => {
  throw new Error("Oops something broke :/");
});

app.listen(PORT);
