const express = require("express");
const graphqlHTTP = require("express-graphql");
const MyGraphQLSchema = require("./schema/schema");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true
  })
);

mongoose.connect(process.env.MONGO_URI);
mongoose.connection
  .once("open", () => {
    console.log("Success!!! Conneted to your database");
  })
  .on("error", error => console.log("Error connecting to MongoLab:", error));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
