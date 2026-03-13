const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({

  bookId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Book"
  },

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  issueDate:Date,

  returnDate:Date,

  actualReturnDate:Date,

  fineAmount:{
    type:Number,
    default:0
  }

});

module.exports = mongoose.model("Issue", issueSchema);