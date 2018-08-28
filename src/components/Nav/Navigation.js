import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentPage } from '../../redux/actions.js'

class Navigation extends Component {

  handleButtonClick = (e) => {
    this.props.setCurrentPage(e.target.value)
  }

  showButtons = () => {
    return (
      <ul className='nav-list'>
        <li className='nav-items'>
          <button className="navigation-btns" onClick={this.handleButtonClick} value="createCharacter">
            Create Character
          </button>
        </li>

        <li className='nav-items'>
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentPage: (page) => { dispatch( setCurrentPage(page) )},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
