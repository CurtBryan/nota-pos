const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  drink: {
    type: Boolean,
    required: true
  }
});

const menuSchema = new mongoose.Schema({
  restaurant: {
    type: String,
    required: true
  },
  division: {
    type: String,
    required: true,
    unique: true
  },
  items: {
    type: [itemSchema],
    required: false
  }
});

module.exports = mongoose.model("menu", menuSchema);
