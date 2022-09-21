import React, { Component } from "react";

class Post extends Component {
// constructor(props){
//     super(props)
//     this.state = {
//         isComments: props.isComments
//     }
// }

  render() {
    const { title, body, id } = this.props.post;

    return (
      <div className="post" onClick={() => this.props.handleComments(id)}>
        <img src="https://source.unsplash.com/random/181x181?islamic" alt="" />
        <h3 className="title">{title}</h3>
        <p className="body">{body}</p>
      </div>
    );
  }
}

export default Post;
