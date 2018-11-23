const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return null;
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return null;
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return null;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
