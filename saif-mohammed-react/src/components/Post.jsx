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
      <div className="post">
        <div onClick={() => this.props.handleComments(id)}>
          <img
            src={`https://source.unsplash.com/random/${200 + id}x${
              200 + id
            }?islamic`}
            alt=""
          />
          <h3 className="title">{title}</h3>
          <p className="body">{body}</p>
        </div>
        <button onClick={() => this.props.handleDeletePost(id)}>
          delete post
        </button>
      </div>
    );
  }
}

export default Post;
