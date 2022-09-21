import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Comment from "./components/Comment";
import AddCommentForm from "./components/AddCommentForm";
import React, { Component } from "react";
import AddPostForm from "./components/AddPostForm";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      listOfPosts: [],
      isComments: false,
      isPostFormShown : false,
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
        posts = posts.slice(0, 10);
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

  addPost = (post) => {
    post.id = Math.random() + Date.now();
    this.setState({listOfPosts: [post, ...this.state.listOfPosts]})
  }
  addComment = (comment) => {
    comment.id = Math.random() + Date.now();
    this.setState({ comments : [comment, ...this.state.comments] })
  }

  handleComments = (id) => {
    this.setState({
      isComments: true,
      id,
    });
  };
  handlePostForm = () => {
    this.setState({
      isComments: false,
      isPostFormShown: true,
    });
  };
  goHome = () => {
    this.setState({
      isComments: false,
      isPostFormShown: false,
    });
  } 
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
          handlePostForm={this.handlePostForm}
        />
        {
        this.state.error? <p>{this.state.error}</p> :
        !this.state.isComments ? 
        this.state.isPostFormShown ? <AddPostForm goHome={this.goHome} addPost={this.addPost}/> : 
        (
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
        ) 
        : (
          <section className="comments">
            <button onClick={this.goHome}>
              Go Home
            </button>
            <AddCommentForm addComment = {this.addComment} />

            {this.state.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} addComment = {this.addComment} />
            ))}
          </section>
        )}
      </div>
    );
  }
}

export default App;
