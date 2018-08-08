import React, { Component } from 'react'
import ThreeScene from './ThreeScene'
import { Transition } from 'react-transition-group'


class Welcome extends Component {
  constructor(props) {
    super(props)

    this.welcomeText = React.createRef()
  }

  componentDidMount() {
    setTimeout(() => {
      this.welcomeText.current.className = "welcome-text"
    }, 2000)

    setTimeout(() => {
      this.welcomeText.current.className = "welcome-text hidden"
    }, 4000)
  }

  render() {
    return (
      <div id="welcome">
        <p className="welcome-text hidden" ref={this.welcomeText}>Welcome to Dungeon Friend</p>
        <ThreeScene rotation={[0.008, 0.008]} sizeDivisor={1} />
      </div>
    )
  }
}

export default Welcome
