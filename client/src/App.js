import React, { Component } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Authors from "./components/Authors";
import AuthorForm from "./components/AuthorForm";
import AuthorInfo from "./components/AuthorInfo";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";

import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/author/new">Create Author</Link>
              </li>
            </ul>

            <hr />
            <header className="App-header">
              <Switch>
                <Route exact path="/" component={Authors} />
                <Route exact path="/author/new" component={AuthorForm} />
                <Route path="/author/:id" component={AuthorInfo} />
              </Switch>
            </header>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
