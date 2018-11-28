import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_AUTHOR = gql`
  mutation AuthorForm($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;

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

class AuthorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    console.log("name", this.state.name, this.state.age);
    event.preventDefault();
  }
  render() {
    console.log("AUTHOR FORM PROPS", this.props);
    return (
      <Mutation mutation={ADD_AUTHOR} refetchQueries={[{ query: GET_AUTHORS }]}>
        {(addAuthor, { data }) => {
          return (
            <div>
              <h1>Author Form</h1>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addAuthor({
                    variables: {
                      name: this.state.name,
                      age: parseInt(this.state.age)
                    }
                  })
                    .then(() => this.props.history.push("/"))
                    .catch(err => console.log(err));
                }}
              >
                <label>
                  Name:
                  <input type="text" name="name" onChange={this.handleChange} />
                </label>
                <label>
                  Age:
                  <input
                    type="number"
                    name="age"
                    onChange={this.handleChange}
                  />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default AuthorForm;
