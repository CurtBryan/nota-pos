const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  restaurant: {
    type: String,
    required: true
  },
  employee: {
    type: Number,
    required: true
  },
  tablenum: {
    type: Number,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  itemprice: {
    type: Number,
    required: true
  },
  mod: {
    type: String
  },
  ticketnum: {
    type: Number,
    required: true
  },
  drink: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("ticket", ticketSchema);
