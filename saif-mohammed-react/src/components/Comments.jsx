import React, { Component } from 'react'
import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";

class Comments extends Component {
 
  render() {
    const {isLoadingComments, commentError,comments,addComment,handleDeleteComment,goHome} = this.props
    return (
        <section className="comments">
        {commentError ? (
          <p>{commentError}</p>
        ) : isLoadingComments ? (
          <p>Loading...</p>
        ) : (
          <>
            <button onClick={goHome}>Go Home</button>
            <AddCommentForm addComment={addComment} />
            {!comments.length ? (
              <p>No Comments yet</p>
            ) : (
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  handleDeleteComment={handleDeleteComment}
                />
              ))
            )}
          </>
        )}
      </section>
    )
  }
}

export default Comments