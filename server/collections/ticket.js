const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  restaurant: {
    type: String,
    required: true
  },
  employee: {
    type: String,
    required: true
  },
  tablenum: {
    type: Number,
    required: true
  },
  itemnum: {
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
  ticketsplit: {
    type: Number
  },
  drink: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  fulfilled: {
    type: Boolean,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("ticket", ticketSchema);
