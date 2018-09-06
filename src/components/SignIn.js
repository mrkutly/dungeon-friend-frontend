import React, { Component } from 'react'
import Adapter from '../Adapter'
import { connect } from 'react-redux'
import { setCharacters, setCurrentUser, setCurrentPage } from '../redux/actions.js'
import { Form } from 'semantic-ui-react'

class SignIn extends Component {

  state = {
    username: ''
  }

  componentWillMount() {
    this.props.setCurrentPage("signin")
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
    Adapter.get(`test_users/${user.id}/characters`)
      .then( ({ characters }) => {
        this.props.setCharacters(characters)
        this.props.setCurrentUser(user)
      }
    )
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input type="text" onChange={this.handleChange} value={this.state.username}/>
        </Form.Field>
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setCharacters: (characters) => { dispatch( setCharacters(characters) )},
    setCurrentUser: (user) => { dispatch( setCurrentUser(user) )},
    setCurrentPage: (page) => { dispatch( setCurrentPage(page) )},
  }
}


export default connect(null, mapDispatchToProps)(SignIn)
