import React, { Component } from 'react'
import ThreeScene from './Logo/ThreeScene'

class Welcome extends Component {
  constructor(props) {
    super(props)

    this.welcomeText = React.createRef()
    this.welcomeDiv = React.createRef()
  }

  componentDidMount() {
    setTimeout(() => {
      this.welcomeText.current.className = "welcome-text"
    }, 500)

    setTimeout(() => {
      this.welcomeText.current.className = "welcome-text hidden"
    }, 2000)

    setTimeout(() => {
      this.welcomeDiv.current.className = "welcome zoom"
    }, 4000)
  }

  render() {
    return (
      <div className="welcome" ref={this.welcomeDiv}>
        <p className="welcome-text hidden" ref={this.welcomeText}>Welcome to Dungeon Friend</p>
        <ThreeScene rotation={[0.008, 0.008]} sizeDivisor={1} />
      </div>
    )
  }
}

export default Welcome
