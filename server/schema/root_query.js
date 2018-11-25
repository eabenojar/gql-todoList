const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const Author = require("../models/author");
const Post = require("../models/post");
const { PostType, AuthorType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    authorPosts: {
      type: new GraphQLList(PostType),
      args: {
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        Post.findById(args.authorId);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
});

module.exports = RootQuery;