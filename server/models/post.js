const mongoose = require("mongoooe");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  description: String,
  authorId: String
});

module.exports = mongoose.model("Post", postSchema);
