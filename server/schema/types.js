const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Author = require("../models/author");
const Post = require("../models/post");

// Posts type
const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString }
    // author: {
    //   type: AuthorType,
    //   resolve(parent, args) {
    //     return Post.findById(parent.id);
    //   }
    // }
  })
});

// Author type
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        console.log("PARENT", parent.id);
        return Author.findPosts(parent.id);
      }
    }
  })
});

module.exports = {
  PostType,
  AuthorType
};
