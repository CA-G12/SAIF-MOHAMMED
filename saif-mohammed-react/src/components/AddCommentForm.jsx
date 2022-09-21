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
      <div>
        <input
          type="text"
          value={this.state.comment}
          onChange={(e) =>
            this.setState({
              comment: e.target.value,
            })
          }
        />
        <button
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
          Add Comment
        </button>
      </div>
    );
  }
}

export default AddCommentForm;
