import React, { Component } from 'react'

class Navigation extends Component {
  render() {
    return (
      <ul>
        <li><button className="navigation-btns">Sign In</button></li>
        <li><button className="navigation-btns">Create Character</button></li>
        <li><button className="navigation-btns">Manage Character</button></li>
      </ul>
    )
  }
}

export default Navigation
