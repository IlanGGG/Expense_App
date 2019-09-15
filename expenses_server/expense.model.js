const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserExpenses = new Schema({
  userName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15
  },
  description: {
    type: String,
    required: true,
    maxlength: 25
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  }
});

module.exports = mongoose.model("UserExpenses", UserExpenses);
