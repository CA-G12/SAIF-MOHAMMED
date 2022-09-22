import Navbar from "./components/Navbar";
// import Post from "./components/Post";
// import Comment from "./components/Comment";
// import AddCommentForm from "./components/AddCommentForm";
import React, { Component } from "react";
import AddPostForm from "./components/AddPostForm";
import Posts from "./components/Posts";
import Comments from "./components/Comments";
export class App extends Component {
  constructor() {
    super();
    this.state = {
      listOfPosts: [],
      isComments: false,
      isPostFormShown: false,
      id: 0,
      comments: [],
      searchedValue: "",
      isLoadingComments: true,
      isLoading: true,
      error: "",
      commentError: "",
      currentPost: null,
      confirm: false,
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to get posts from that resources");
        }
        return response.json();
      })
      .then((posts) => {
        posts = posts.slice(0, 15);
        this.setState({
          isLoading: false,
        });
        this.setState({ listOfPosts: posts });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.id !== prevState.id) {
      fetch(
        `https://jsonplaceholder.typicode.com/posts/${this.state.id}/comments`
      )
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Failed to get comments from that resources");
          }
          return response.json();
        })
        .then((data) =>
          this.setState({
            isLoadingComments: false,
            comments: data,
          })
        )
        .catch((err) => {
          this.setState({
            commentError: err.message,
          });
        });
    }
  }

  addPost = (post) => {
    post.id = Math.random() + Date.now();
    this.setState({ listOfPosts: [post, ...this.state.listOfPosts] });
  };
  addComment = (comment) => {
    comment.id = Math.random() + Date.now();
    this.setState({ comments: [comment, ...this.state.comments] });
  };

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
  };
  handleDeletePost = (id) => {
    if (window.confirm("Are you Sure That you want to delete this post ?")) {
      const FilteredPost = this.state.listOfPosts.filter(
        (post) => post.id !== id
      );
      this.setState({
        listOfPosts: FilteredPost,
      });
    }
  };

  handleDeleteComment = (id) => {
    const FilteredComments = this.state.comments.filter(
      (comment) => comment.id !== id
    );
    this.setState({
      comments: FilteredComments,
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
        {!this.state.isComments ? (
          this.state.isPostFormShown ? (
            <AddPostForm goHome={this.goHome} addPost={this.addPost} />
          ) : (
            <Posts
              error={this.state.error}
              isLoading={this.state.isLoading}
              listOfPosts={this.state.listOfPosts}
              searchedValue={this.state.searchedValue}
              handleDeletePost={this.handleDeletePost}
              handleComments={this.handleComments}
            />
          )
        ) : (
          <Comments
            isLoadingComments={this.state.isLoadingComments}
            commentError={this.state.commentError}
            comments={this.state.comments}
            handleDeleteComment={this.handleDeleteComment}
            goHome={this.goHome}
            addComment={this.addComment}
            post={this.state.listOfPosts.find(
              (post) => post.id === this.state.id
            )}
          />
        )}
      </div>
    );
  }
}

export default App;
