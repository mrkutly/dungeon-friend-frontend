import React, { Component } from 'react'
import ThreeScene from './ThreeScene'
import Navigation from './Navigation'
import Logo from './Logo'

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.navbarDiv = React.createRef()
  }

  componentDidMount() {
    setTimeout(() => {
      this.navbarDiv.current.className = 'navbar'
    }, 500)
  }

  render() {
    return (
      <div className="navbar hidden" ref={this.navbarDiv}>
        <Logo />
        <Navigation setCurrentPage={this.props.setCurrentPage} />
      </div>
    )
  }
}

export default Navbar
