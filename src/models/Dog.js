const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
  id: String,
  url: String,
  breed: String,
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Dog", DogSchema);
