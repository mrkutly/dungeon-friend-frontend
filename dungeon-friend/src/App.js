import React, { Component } from 'react';
import './App.css';
import Welcome from './components/Welcome'
import Home from './components/Home'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      welcome: true
    }

    setTimeout(this.showNav, 10000)
  }

  showNav = () => {
    this.setState({ welcome: false })
  }

  renderWelcome = () => {
    return <Welcome />
  }

  renderHome = () => {
    return  <Home />
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
