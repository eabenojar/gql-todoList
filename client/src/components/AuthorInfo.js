import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

const DELETE_POST = gql`
  mutation DeletePost($id: String) {
    deletePost(id: $id) {
      title
      description
    }
  }
`;

const GET_AUTHOR = gql`
  query GetAuthor($id: String!) {
    author(id: $id) {
      name
      age
      posts {
        title
        description
      }
    }
  }
`;

class AuthorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("PROPS AUTHOR INFO", this.props);
    const { id, name, age, posts } = this.props.location.state;

    return (
      <Query query={GET_AUTHOR} variables={{ id }}>
        {({ loading, error, data }) => {
          console.log("GET AUTHOR QUERY", data);
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <h5>Author: {data.author.name}</h5>
              <h5>Age: {data.author.age}</h5>
              {data.author.posts.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="posts">
                      <p>{item.title}</p>
                      <p>{item.description}</p>
                    </div>
                    <Mutation
                      mutation={DELETE_POST}
                      refetchQueries={[{ query: GET_AUTHOR }]}
                      key={index}
                    >
                      {(deletePost, { data }) => {
                        return (
                          <Button
                            color={"primary"}
                            onClick={() =>
                              deletePost({
                                variables: {
                                  id: item.id
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
              })}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default AuthorInfo;
