const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("./post");

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId
    }
  ]
});

authorSchema.statics.addPost = function(authorId, title, description) {
  return this.findById(authorId).then(author => {
    const post = new Post({
      authorId,
      title,
      description
    });
    author.posts.push(post);
    return Promise.all([post.save(), author.save()]).then(
      ([post, author]) => author
    );
  });
};

module.exports = mongoose.model("Author", authorSchema);
