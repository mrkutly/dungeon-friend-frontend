import React, { Component } from 'react'
import Adapter from '../Adapter'
import { connect } from 'react-redux'
import { setCharacters, setCurrentUser, setCurrentPage } from '../redux/actions.js'
import { Form, Grid, Header } from 'semantic-ui-react'

class SignIn extends Component {

  state = {
    username: '',
    password: '',
    newUsername: '',
    newPassword: '',
    newPasswordConfirmation: ''
  }

  componentWillMount() {
    this.props.setCurrentPage("signin")
  }

  handleChange = (e, field) => {
    e.persist()
    this.setState({ [field]: e.target.value })
  }

  handleLogin = (e) => {
    e.preventDefault()
    Adapter.login(this.state.username, this.state.password)
      .then(response => {
        if (response.errors) {
          alert(response.errors)
          return
        } else {
          this.setCurrentUser(response)
        }
      })
  }

  handleCreateAccount = (e) => {
    const { newUsername, newPassword, newPasswordConfirmation } = this.state
    e.preventDefault()

    if (newUsername.length < 4) {
      alert("Username is too short.")
      return
    }

    if (newPassword.length < 8) {
      alert("Password is too short.")
      return
    }

    if (newPassword !== newPasswordConfirmation) {
      alert("Password and confirmation must match.")
      return
    }

    Adapter.signUp(newUsername, newPassword, newPasswordConfirmation)
      .then(response => {
        if (response.errors) {
          alert(response.errors)
          return
        } else {
          this.setCurrentUser(response)
        }
      })
  }

  setCurrentUser = (user) => {
    Adapter.get(`users/${user.id}/characters`)
      .then( ({ characters }) => {
        this.props.setCharacters(characters)
        this.props.setCurrentUser(user)
      }
    )
  }

  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Header>Log in</Header>
            <Form onSubmit={this.handleLogin}>
              <Form.Field>
                <Form.Input type="text"  label="Username" onChange={(e) => this.handleChange(e, "username")} value={this.state.username}/>
              </Form.Field>
              <Form.Field>
                <Form.Input type="password" label="Password" onChange={(e) => this.handleChange(e, "password")} value={this.state.password}/>
              </Form.Field>
              <Form.Button>Submit</Form.Button>
            </Form>
          </Grid.Column>

          <Grid.Column>
            <Header>Sign up</Header>
            <Form onSubmit={this.handleCreateAccount}>
              <Form.Field>
                <Form.Input type="text"  label="Username" onChange={(e) => this.handleChange(e, "newUsername")} value={this.state.newUsername}/>
              </Form.Field>
              <Form.Field>
                <Form.Input type="password" label="Password" onChange={(e) => this.handleChange(e, "newPassword")} value={this.state.newPassword}/>
              </Form.Field>
              <Form.Field>
                <Form.Input type="password" label="Password Confirmation" onChange={(e) => this.handleChange(e, "newPasswordConfirmation")} value={this.state.newPasswordConfirmation}/>
              </Form.Field>
              <Form.Button>Sign up</Form.Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
