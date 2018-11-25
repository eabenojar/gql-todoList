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
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

authorSchema.statics.addPost = function(authorId, title, description) {
  return this.findById(authorId).then(author => {
    console.log("AUTHOR RETURNSS", author);
    const post = new Post({
      authorId,
      title,
      description
    });
    author.posts.push(post);
    return Promise.all([post.save(), author.save()])
      .then(([post, author]) => author)
      .catch(err => console.log(err));
  });
};

authorSchema.statics.findPosts = function(id) {
  console.log("FIND ID ", id);
  return this.findById(id)
    .populate("posts")
    .then(author => {
      console.log("AUTHOR FIND", author.posts);
      return author.posts;
    })
    .catch(err => {
      console.log("ERRRORRRR", err);
    });
};

module.exports = mongoose.model("Author", authorSchema);
