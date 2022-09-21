import React, { Component } from 'react'

class Navbar extends Component {

  render() {
    return (
      <nav className='navbar'>
            <h1>posts</h1>
            <input type="search" placeholder='search' onChange={this.props.handleSearch}/>
      </nav>
    )
  }
}

export default Navbar