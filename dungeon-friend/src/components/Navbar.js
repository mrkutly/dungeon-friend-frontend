import React, { Component } from 'react'
import ThreeScene from './ThreeScene'
import Navigation from './Navigation'

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="logo">
          <div className="site-name"> Dungeon Friend </div>
          <ThreeScene />
          <ThreeScene />
          <ThreeScene />
        </div>
        <div className="navigation-btns-container">
          <Navigation />
        </div>
      </div>
    )
  }
}

export default Navbar
