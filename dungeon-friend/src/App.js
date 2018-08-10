import React, { Component } from 'react';
import './App.css';
import Welcome from './components/Welcome'
import Home from './components/Home'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      welcome: true,
      user_id: null
    }

    setTimeout(this.showNav, 10000)
  }

  showNav = () => {
    this.setState({ welcome: false })
  }

  setUserId = (user_id) => {
    this.setState({ user_id })
  }

  renderWelcome = () => {
    return <Welcome />
  }

  renderHome = () => {
    return  <Home setUserId={this.setUserId} />
  }

  render() {
    return (
      <div id="main">
        {this.state.welcome ? this.renderWelcome() : this.renderHome()}
      </div>
    )
  }
}

export default App;
