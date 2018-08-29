import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const link = {
  textDecoration: "none"
}

const Navigation = (props) => {
  return (
    <div className="navigation-btns-container">
      <ul className='nav-list'>
        {!props.currentUser ?
          <li className='nav-items'>
            <NavLink to="/signin" style={link}>
              <button className="navigation-btns">Sign In</button>
            </NavLink>
          </li>
          : null }

        <li className='nav-items'>
          <NavLink to="/create" style={link}>
            <button className="navigation-btns">Create Character</button>
          </NavLink>
        </li>

        <li className='nav-items'>
          <NavLink to="/characters" style={link}>
            <button className="navigation-btns">Characters</button>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Navigation)
