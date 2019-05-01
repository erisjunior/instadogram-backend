const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
  id: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  },
  comments: [{ comment: String, author: String }],
  likeds: [{ user: String }],
  bookmarkeds: [{ user: String }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Dog", DogSchema);
