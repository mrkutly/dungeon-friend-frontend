import React, { Component } from 'react'
import Navigation from './Navigation'
import Logo from '../Logo/Logo'

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
        <Navigation setCurrentPage={this.props.setCurrentPage} currentUser={this.props.currentUser} />
      </div>
    )
  }
}

export default Navbar
