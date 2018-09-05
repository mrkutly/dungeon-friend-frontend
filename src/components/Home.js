import React, { Component } from 'react'
import Navbar from './Nav/Navbar'
import SignIn from './SignIn'
import CreateCharacter from './CreateCharacter'
import CharacterCardsContainer from './Containers/CharacterCardsContainer'
import CharacterSheet from './Characters/CharacterSheet'
import CharacterEdit from './Characters/CharacterEdit'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { setCurrentPage } from '../redux/actions'


class Home extends Component {
  constructor(props) {
    super(props)

    this.homeDiv = React.createRef()
  }

  componentDidMount() {
    setTimeout(() => {
      this.homeDiv.current.className = "home"
    }, 500)
  }

  setItem = (activeItem) => {
    this.setState({ activeItem })
  }

  redirectToCharacters = () => {
    this.props.setCurrentPage("characters")
    return <Redirect to="characters" />
  }

  redirectToSignIn = () => {
    this.props.setCurrentPage("signin")
    return <Redirect to="signin" />
  }

  toCharacterCreate = () => {
    this.props.setCurrentPage("create")
    return <CreateCharacter />
  }

  toCharacterEdit = (_props) => {
    this.props.setCurrentPage("characters")
    return <CharacterEdit {..._props} />
  }

  toCharacterShow = (_props) => {
    this.props.setCurrentPage("characters")
    return <CharacterSheet {..._props} />
  }

  toCharactersIndex = () => {
    this.props.setCurrentPage("characters")
    return <CharacterCardsContainer />
  }

  toSignIn = () => {
    this.props.setCurrentPage("signin")
    return <SignIn />
  }

  render() {
    const { currentUser, characterCreated } = this.props
    return (
      <div className="home hidden" ref={this.homeDiv}>
        <Router>
          <React.Fragment>
            <Navbar />
            <Container>
              <Route exact path="/signin" render={() => (currentUser ? this.redirectToCharacters() : this.toSignIn())} />
              <Route exact path="/create" render={() => (characterCreated ? this.redirectToCharacters() : this.toCharacterCreate())} />
              <Route exact path="/characters" render={() => this.toCharactersIndex()} />
              <Route exact path="/characters/:id" render={props => (!currentUser ? this.redirectToSignIn() : this.toCharacterShow(props))} />
              <Route exact path="/characters/:id/edit" render={props => (!currentUser ? this.redirectToSignIn() : this.toCharacterEdit(props))} />
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
    setCurrentPage: (page) => dispatch( setCurrentPage(page) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
