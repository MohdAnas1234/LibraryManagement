const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  quantity: Number,
  availableCopies: Number
});

module.exports = mongoose.models.Book || mongoose.model("Book", bookSchema);