import React, { Component } from 'react'

class Navbar extends Component {

  render() {
    return (
      <header>
          <nav className='navbar'>
                <h1 className='logo'>posts</h1>
                <div className="links">
                  <input type="search" className='search-input' placeholder='search' onChange={this.props.handleSearch}/>
                  <button onClick={this.props.handlePostForm}>Add post</button>
                </div>
              
          </nav>
      </header>

    )
  }
}

export default Navbar