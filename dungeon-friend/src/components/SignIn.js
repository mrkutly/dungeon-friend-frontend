import React, { Component } from 'react'

const URL = 'http://localhost:3000/sessions' //not done. check rails api for routes

class SignIn extends Component {

  state = {
    username: null
  }

  handleChange = (e) => {
    this.setState({ username: e.target.value })
  }

  handleSubmit = (e) => {
    //fetch to localhost to hit the sessions#create method,
    // which will find or create a user by the username and send a response with that user_id.
    // after that, we can call this.props.setUserId with that ID.
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
