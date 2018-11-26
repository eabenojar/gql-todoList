const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID
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
    },
    deletePost: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        return Post.findByIdAndRemove(args.id).then(post => {
          Author.findById(post.authorId).then(author => {
            const updatePost = [...author.posts];

            console.log("AUTHOR", author);
          });
          console.log("RETURN POST FOUND", post);
          return post;
        });
      }
    },
    deleteAuthor: {
      type: AuthorType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        return Author.findByIdAndRemove(args.id);
      }
    },
    updatePost: {
      type: PostType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Post.findByIdAndUpdate(
          args.id,
          {
            title: args.title,
            description: args.description
          },
          { new: true }
        )
          .then(post => {
            console.log("POOSSSSTT", post);
            return post;
          })
          .catch(err => console.log(err));
      }
    },
    updateAuthor: {
      type: AuthorType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return Author.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
            age: args.age
          },
          { new: true }
        )
          .then(author => {
            return author;
          })
          .catch(err => console.log(err));
      }
    }
  }
});

module.exports = mutation;
