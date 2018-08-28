import React, { Component } from 'react'
import Adapter from '../Adapter'
import { connect } from 'react-redux'
import { setCharacters, setCurrentUser } from '../redux/actions.js'

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
      .then(user => this.setCurrentUser(user))
  }

  setCurrentUser = (user) => {
    this.props.setCurrentUser(user)
    Adapter.get(`test_users/${user.id}/characters`).then( ({ characters }) => this.props.setCharacters(characters))
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


const mapDispatchToProps = (dispatch) => {
  return {
    setCharacters: (characters) => { dispatch( setCharacters(characters) )},
    setCurrentUser: (user) => { dispatch( setCurrentUser(user) )}
  }
}

export default connect(null, mapDispatchToProps)(SignIn)
