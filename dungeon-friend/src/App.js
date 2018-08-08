import React, { Component } from 'react';
import './App.css';
import Welcome from './components/Welcome'
import Navbar from './components/Navbar'


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

  renderNav = () => {
    return  <Navbar />
  }

  render() {
    return (
      <div id="main">
        {this.state.welcome ? this.renderWelcome() : this.renderNav()}
      </div>
    )
  }
}

export default App;
