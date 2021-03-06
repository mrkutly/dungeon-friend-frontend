import React, { Component } from 'react'
import './App.css'
import Home from './components/Home'
import Welcome from './components/Welcome'


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
        {this.state.welcome ? <div id="black-background"><Welcome /></div> : <Home /> }
      </div>
    )
  }
}

export default App
