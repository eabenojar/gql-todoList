import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

const DELETE_POST = gql`
  mutation DeletePost($id: String!) {
    deletePost(id: $id) {
      title
      description
    }
  }
`;

const GET_AUTHOR = gql`
  query GetAuthor($id: String!) {
    author(id: $id) {
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

// const UPDATE_POST = gql`
//   mutation UpdatePost($id: String!, $title: String, $description: String) {
//     updatePost(id: $id, title: $title, description: $description) {
//       id
//       title
//       description
//     }
//   }
// `;

const ADD_POST = gql`
  mutation AddPostToAuthor(
    $authorId: String!
    $title: String!
    $description: String!
  ) {
    addPostToAuthor(
      authorId: $authorId
      title: $title
      description: $description
    ) {
      id
      title
      description
      author {
        name
        age
      }
    }
  }
`;

class AuthorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      authorId: props.location.state.id
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { id } = this.props.location.state;
    console.log(
      "AUTHOR INFO PROPS",
      this.state,
      "ID",
      typeof this.state.authorId
    );
    return (
      <Query
        query={GET_AUTHOR}
        variables={{ id: this.state.authorId }}
        partialRefetch={true}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <Mutation
                mutation={ADD_POST}
                refetchQueries={[{ query: GET_AUTHOR }]}
              >
                {AddPostToAuthor => {
                  return (
                    <div>
                      <h1>Author Form</h1>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          AddPostToAuthor({
                            variables: {
                              authorId: data.author.id,
                              title: this.state.title,
                              description: this.state.description
                            }
                          });
                        }}
                      >
                        <label>
                          Title:
                          <input
                            type="text"
                            name="title"
                            onChange={this.handleChange}
                          />
                        </label>
                        <label>
                          Description:
                          <input
                            type="text"
                            name="description"
                            onChange={this.handleChange}
                          />
                        </label>
                        <input type="submit" value="Submit" />
                      </form>
                    </div>
                  );
                }}
              </Mutation>
              <h5>Author: {data.author.name}</h5>
              <h5>Age: {data.author.age}</h5>
              {data.author.posts.map((item, index) => {
                console.log("DELETE ITEM", item);
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
                            onClick={() => {
                              console.log("del", item.id);
                              deletePost({
                                variables: {
                                  id: item.id
                                }
                              });
                            }}
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
