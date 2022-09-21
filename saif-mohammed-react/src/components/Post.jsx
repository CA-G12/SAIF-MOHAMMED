import React, { Component } from "react";

class Post extends Component {


  render() {
    const { title, body, id,img } = this.props.post;

    return (
      <div className="post">
        <div onClick={() => this.props.handleComments(id)} className="post-info">
          <img
            src={!img ? `https://source.unsplash.com/random/${200 + id}x${200 + id}?islamic`: img}
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
