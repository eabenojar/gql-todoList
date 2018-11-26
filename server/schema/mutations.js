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
    addPostToAuthor: {
      type: PostType,
      args: {
        authorId: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        console.log("ARRSSSSSS", args);
        console.log("AUTHOR", Author.addPost());
        return Author.addPost(args.authorId, args.title, args.description);
      }
    }
  }
});

module.exports = mutation;
