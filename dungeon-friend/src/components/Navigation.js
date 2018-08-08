import React from 'react'

const Navigation = (props) => {
  return (
    <div className="navigation-btns-container">
      <ul>
        <li><button className="navigation-btns">Sign In</button></li>
        <li><button className="navigation-btns">Create Character</button></li>
        <li><button className="navigation-btns">Manage Character</button></li>
      </ul>
    </div>
  )
}

export default Navigation
