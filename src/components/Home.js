import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import CharacterSheet from './Characters/CharacterSheet'
import CharacterEdit from './Characters/CharacterEdit'
import CharacterCardsContainer from './Containers/CharacterCardsContainer'
import CreateCharacter from './CreateCharacter'
import Navbar from './Nav/Navbar'
import SignIn from './SignIn'
import Adapter from '../Adapter'
import { setCurrentPage, setCurrentUser, setCharacters } from '../redux/actions'


class Home extends Component {
  constructor(props) {
    super(props)

    this.homeDiv = React.createRef()
    this.audio = React.createRef()
  }

  componentDidMount() {
    const { currentUser } = this.props
    const token = localStorage.getItem('token')

    if(token && !currentUser) {
      Adapter.reAuth(token).then(({ user }) => this.setCurrentUser(user))
    }
  }

  createPath = () => {
    const { currentUser, characterCreated } = this.props

    if (characterCreated && currentUser){
      return <Redirect to="characters" />
    } else {
      return this.redirectToSignIn(<CreateCharacter />)
    }
  }

  redirectToSignIn = (component) => {
    const { currentUser } = this.props
    return (!currentUser ? <Redirect to="signin" /> : component)
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
    const { currentUser } = this.props
    return (
      <div className="home" ref={this.homeDiv}>
        <Router>
          <React.Fragment>
            <Navbar />
            <Container>
              <Route exact path="/signin" render={() => (currentUser ? <Redirect to="create" /> : <SignIn />)} />
              <Route exact path="/create" render={() => this.createPath()} />
              <Route exact path="/characters" render={() => this.redirectToSignIn(<CharacterCardsContainer />)} />
              <Route exact path="/characters/:id" render={props => this.redirectToSignIn(<CharacterSheet {...props} />)} />
              <Route exact path="/characters/:id/edit" render={props => this.redirectToSignIn(<CharacterEdit {...props} />) } />
            </Container>
          </React.Fragment>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    characterCreated: state.characterCreated,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentPage: (page) => dispatch( setCurrentPage(page) ),
    setCurrentUser: (user) => dispatch( setCurrentUser(user) ),
    setCharacters: (characters) => dispatch( setCharacters(characters) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
