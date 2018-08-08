import React, { Component } from 'react'
import ThreeScene from './ThreeScene'
import Navigation from './Navigation'
import Logo from './Logo'

const Navbar = (props) => {
  return (
    <div className="navbar">
      <Logo />
      <Navigation />
    </div>
  )
}

export default Navbar
