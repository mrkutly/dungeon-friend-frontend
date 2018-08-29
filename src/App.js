import React, { Component } from 'react'
import './App.css'
import Welcome from './components/Welcome'
import Home from './components/Home'


class App extends Component {

  state = {
    welcome: false
  }

  componentDidMount() {
    setTimeout(this.showNav, 7000)
  }

  showNav = () => {
    this.setState({ welcome: false })
  }

  render() {
    return (
      <div id="main">
        {this.state.welcome ? <Welcome /> : <Home /> }
      </div>
    )
  }
}

export default App
