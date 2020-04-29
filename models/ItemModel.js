const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
