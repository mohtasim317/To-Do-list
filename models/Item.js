const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Items", ItemSchema);
