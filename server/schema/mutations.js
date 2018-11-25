const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = graphql;
const Author = require("../models/author");
const Post = require("../models/post");
const { PostType, AuthorType } = require("./types");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPost: {
      type: PostType,
      args: {}
    },
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        console.log("ADDDDDDDED", args);
        let newAuthor = new Author({
          name: args.name,
          age: args.age
        });
        return newAuthor
          .save()
          .then(res => {
            console.log("SUCCESS", res);
            return res;
          })
          .catch(err => console.log(err));
      }
    },
    addPost: {
      type: PostType,
      args: {
        authorId: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        console.log("ARGS", args, Post);
        let newPost = new Post({
          title: args.title,
          description: args.description,
          authorId: args.authorId
        });
        return newPost
          .save()
          .then(res => {
            console.log("SUCCESS", res);
            return res;
          })
          .catch(err => console.log(err));
      }
    }
  }
});

module.exports = mutation;