const { GraphQLSchema } = require("graphql");
const graphql = require("graphql");
const _ = require("lodash");

// Import RootQuery and Mutations
const RootQuery = require("./root_query");
const mutation = require("./mutations");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});
