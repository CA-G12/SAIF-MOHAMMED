import React, { Component } from "react";

class AddCommentForm extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
    };
  }
  render() {
    return (
      <div className="add-comment-form">
        <input
          className="add-comment-input"
          type="text"
          placeholder="Add comments"
          value={this.state.comment}
          onChange={(e) =>
            this.setState({
              comment: e.target.value,
            })
          }
        />
        <button
          className="add-comment-btn"
          onClick={() => {
            this.props.addComment({
              body: this.state.comment,
              name: "user",
              email: "user@gmail.com",
            });
            this.setState({
              comment: "",
            });
          }}
        >
          Add
        </button>
      </div>
    );
  }
}

export default AddCommentForm;
