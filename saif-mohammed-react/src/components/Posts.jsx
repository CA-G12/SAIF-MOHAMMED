import React, { Component } from 'react'
import Post from "./Post";


class Posts extends Component {
  render() {
    const {isLoading,listOfPosts,searchedValue,error,handleComments,handleDeletePost} = this.props
    return (
        <section className="posts">
        {
        error ? (<p>{error}</p>) : 
        isLoading ? (
          <p>Loading...</p>
        ) : !listOfPosts.length ? (
          <p> No Posts Yet! </p>
        ) : (
          listOfPosts
            .filter(
              (post) =>
                post.title
                  .toLowerCase()
                  .includes(searchedValue.toLowerCase()) ||
                post.body
                  .toLowerCase()
                  .includes(searchedValue.toLowerCase())
            )
            .map((post) => (
              <Post
                key={post.id}
                post={post}
                handleComments={handleComments}
                handleDeletePost={handleDeletePost}
              />
            ))
        )}
      </section>
    )
  }
}

export default Posts