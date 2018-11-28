import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

const GET_AUTHORS = gql`
  {
    authors {
      id
      name
      age
      posts {
        id
        title
        description
      }
    }
  }
`;

const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
      age
    }
  }
`;

class Authors extends Component {
  constructor(props) {
    super(props);
    this.cardInfo = this.cardInfo.bind(this);

    this.state = {
      authors: []
    };
  }

  cardInfo(item) {
    console.log("CARD INFO");
    this.props.history.push({
      pathname: `/author/${item.id}`,
      state: item
    });
  }
  render() {
    console.log("PROPS AUTHOR", this.props);
    return (
      <Query query={GET_AUTHORS} partialRefetch={true}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return data.authors.map(({ name, id, posts, age }, index) => {
            return (
              <div key={index}>
                <Card
                  classes={{ root: "card-style" }}
                  onClick={() => this.cardInfo({ name, id, posts, age })}
                >
                  <h5>Author: {name}</h5>
                </Card>
                <Mutation
                  mutation={DELETE_AUTHOR}
                  refetchQueries={[{ query: GET_AUTHORS }]}
                >
                  {(deleteAuthor, { data }) => {
                    return (
                      <Button
                        color={"primary"}
                        onClick={() =>
                          deleteAuthor({
                            variables: {
                              id: id
                            }
                          })
                        }
                      >
                        Delete
                      </Button>
                    );
                  }}
                </Mutation>
              </div>
            );
          });
        }}
      </Query>
    );
  }
}

export default Authors;
