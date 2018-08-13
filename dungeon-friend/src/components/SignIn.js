import React, { Component } from 'react'
import Adapter from '../Adapter'

class SignIn extends Component {
  constructor() {
    super()

    this.state = {
      username: ''
    }
  }

  handleChange = (e) => {
    e.persist()
    this.setState({ username: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    Adapter.login(this.state.username)
      .then(user => this.props.setCurrentUser(user))
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} value={this.state.username}/>
        <button type="submit">sign in</button>
      </form>
    )
  }
}

export default SignIn
