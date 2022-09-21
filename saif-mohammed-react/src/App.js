import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Comment from "./components/Comment";

import React, { Component } from "react";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      listOfPosts: [],
      isComments: false,
      id: 0,
      comments: [],
      searchedValue: "",
      isLoading: true,
      error: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to get data from that resources");
        }
        return response.json();
      })
      .then((posts) => {
        posts = posts.slice(0, 5);
        this.setState({
          isLoading: false,
        });
        this.setState({ listOfPosts: posts });
      })
      .catch((err) => {
        this.setState({
          error : err.message
        })
            });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.id !== prevState.id) {
      fetch(
        `https://jsonplaceholder.typicode.com/posts/${this.state.id}/comments`
      )
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            comments: data,
          })
        );
    }
  }

  handleComments = (id) => {
    this.setState({
      isComments: true,
      id,
    });
  };
  handleDeletePost = (id) => {
    const FilteredPost = this.state.listOfPosts.filter(
      (post) => post.id !== id
    );
    this.setState({
      listOfPosts: FilteredPost,
    });
  };
  handleSearch = (e) => {
    this.setState({ searchedValue: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <Navbar
          searchedValue={this.state.searchedValue}
          handleSearch={this.handleSearch}
        />
        {
        this.state.error? <p>{this.state.error}</p> :
        !this.state.isComments ? (
          <section className="posts">
            {this.state.isLoading ? (
              <p>Loading...</p>
            ) : !this.state.listOfPosts.length ? (
              <p> No Posts Yet! </p>
            ) : (
              this.state.listOfPosts
                .filter(
                  (post) =>
                    post.title
                      .toLowerCase()
                      .includes(this.state.searchedValue.toLowerCase()) ||
                    post.body
                      .toLowerCase()
                      .includes(this.state.searchedValue.toLowerCase())
                )
                .map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    handleComments={this.handleComments}
                    handleDeletePost={this.handleDeletePost}
                  />
                ))
            )}
          </section>
        ) : (
          <section className="comments">
            <button onClick={() => this.setState({ isComments: false })}>
              Go Home
            </button>
            {this.state.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </section>
        )}
      </div>
    );
  }
}

export default App;
