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
      id : 0,
      comments : [],
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => this.setState({ listOfPosts: posts }))
      .catch((err) => console.log(err));
  }
  componentDidUpdate(prevProps,prevState) {
    if(this.state.id !==prevState.id){
      fetch(`https://jsonplaceholder.typicode.com/posts/${this.state.id}/comments`)
      .then(response => response.json()).then(data => this.setState({
        comments:data
      }))
    }
 
  }

  handleComments = (id) => {
    this.setState({
        isComments: true,
        id
    })

  };

  render() {
    return (
      <div className="App">
        <Navbar />
        {
        !this.state.isComments ? (
          <section className="posts">
            {this.state.listOfPosts.map((post) => (
              <Post key={post.id} post={post} handleComments = {this.handleComments}  />
            ))}
          </section>
        ) : (
            <section className="comments">
                {this.state.comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
            </section>
          
        )}
      </div>
    );
  }
}

export default App;
