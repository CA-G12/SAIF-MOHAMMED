import React, { Component } from 'react'
import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";
import Post from './Post';
class Comments extends Component {
 
  render() {
    const {isLoadingComments, commentError,comments,addComment,handleDeleteComment,goHome,post} = this.props
    return (
        <section className="comments container">
        {

        commentError ? (
          <p>{commentError}</p>
        ) : isLoadingComments ? (
          <p>Loading...</p>
        ) : (
          <>
            <Post post={post}  commentFlag = {true}/>
            <button onClick={goHome} className="go-home">Go Home</button>
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