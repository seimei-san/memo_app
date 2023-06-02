const mongoose = require("mongoose");

const MemoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter Memo Title"],
    trim: true,
    maxlength: [50, "less than 20 char"],
  },
  memo: {
    type: String,
    required: [false, "Enter Memo"],
    maxlength: [200, "less then 200 char"],
  },
  completed: {
    type: Boolean,
    default: false,

  }
});

module.exports = mongoose.model("Memo", MemoSchema)