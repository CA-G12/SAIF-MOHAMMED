import React, { Component } from "react";
export class Comment extends Component {
  render() {
    const {body,name,email} = this.props.comment;
    
    return (
      
      <div  className="comment">
      
        <div className="user-info">
          <div className="name">{name}</div>
          <div className="email">{email}</div>
        </div>
        <p className="body">{body}</p>

      </div>
    );
  }
}

export default Comment;
