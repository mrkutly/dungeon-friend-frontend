import React, { Component } from 'react'

class Navigation extends Component {

  handleButtonClick = (e) => {
    this.props.setCurrentPage(e.target.value)
  }

  render() {
    const { currentUser } = this.props
    return (
      <div className="navigation-btns-container">
        <ul>
          {currentUser ? <li><button className="navigation-btns" onClick={this.handleButtonClick} value="createCharacter">Create Character</button></li> : null }
          {currentUser ? <li><button className="navigation-btns" onClick={this.handleButtonClick} value="manageCharacter">Manage Characters</button></li> : null }
        </ul>
      </div>
    )
  }
}

export default Navigation
