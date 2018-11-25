const mongoose = require("mongoooe");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  authorId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model("Post", postSchema);
