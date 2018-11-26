import React, { Component } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Authors from "./components/Authors";

const client = new ApolloClient({
  uri: "https://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <Authors />
          </header>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
