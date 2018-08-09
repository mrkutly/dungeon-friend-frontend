import React, { Component } from 'react'

class Navigation extends Component {

  handleButtonClick = (e) => {
    this.props.setCurrentPage(e.target.value)
  }

  render() {
    return (
      <div className="navigation-btns-container">
        <ul>
          <li><button className="navigation-btns" onClick={this.handleButtonClick} value="signIn">Sign In</button></li>
          <li><button className="navigation-btns" onClick={this.handleButtonClick} value="createCharacter">Create Character</button></li>
          <li><button className="navigation-btns" onClick={this.handleButtonClick} value="manageCharacter">Manage Character</button></li>
        </ul>
      </div>
    )
  }
}

export default Navigation
