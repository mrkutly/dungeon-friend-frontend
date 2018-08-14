import React, { Component } from 'react'

class Navigation extends Component {

  handleButtonClick = (e) => {
    this.props.setCurrentPage(e.target.value)
  }

  showButtons = () => {
    return (
      <ul>
        <li>
          <button className="navigation-btns" onClick={this.handleButtonClick} value="createCharacter">
            Create Character
          </button>
        </li>

        <li>
          <button className="navigation-btns" onClick={this.handleButtonClick} value="manageCharacter">
            Manage Characters
          </button>
        </li>
      </ul>
    )
  }

  render() {
    const { currentUser } = this.props
    return (
      <div className="navigation-btns-container">
        {currentUser ? this.showButtons() : null }
      </div>
    )
  }
}

export default Navigation
