const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    Number,
    required: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId
    }
  ]
});

module.exports = mongoose.model("Author", authorSchema);
