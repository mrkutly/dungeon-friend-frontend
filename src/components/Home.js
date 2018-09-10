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
    this.audio = React.createRef()
  }

  componentDidMount() {
    setTimeout(() => {
      this.homeDiv.current.className = "home"
    }, 500)
  }

  setItem = (activeItem) => {
    this.setState({ activeItem })
  }

  toCharacterShow = (_props) => {
    this.props.setCurrentPage("characters")
    return <CharacterSheet {..._props} />
  }


  render() {
    const { currentUser, characterCreated } = this.props
    return (
      <div className="home hidden" ref={this.homeDiv}>
        <Router>
          <React.Fragment>
            <Navbar />
            <Container>
              <Route exact path="/signin" render={() => (currentUser ? <Redirect to="characters" /> : <SignIn />)} />
              <Route exact path="/create" render={() => (characterCreated ? <Redirect to="characters" /> : <CreateCharacter />)} />
              <Route exact path="/characters" render={() => <CharacterCardsContainer />} />
              <Route exact path="/characters/:id" render={props => (!currentUser ? <SignIn /> : <CharacterSheet {...props} />)} />
              <Route exact path="/characters/:id/edit" render={props => (!currentUser ? <SignIn /> : <CharacterEdit {...props} />)} />
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
