import React, { Component } from "react";
export class Comment extends Component {
  render() {
    const { body, name, email, id } = this.props.comment;

    return (
      <div className="comment">
        <div className="user-info">
          <div className="user-info-details">
              <img
                className="user-img"
                src={`https://source.unsplash.com/random/${100 + Math.ceil(id)}x${
                  100 + Math.ceil(id)
                }?user`}
                alt=""
              />
          <div className="name">{name.split(" ")[0]}</div>
          </div>
          <div className="email">{email}</div>
        </div>
        <p className="body">{body}</p>
        <button onClick={() => this.props.handleDeleteComment(id)}>
          delete
        </button>
      </div>
    );
  }
}

export default Comment;
