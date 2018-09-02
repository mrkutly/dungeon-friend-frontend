import React, { Component } from 'react'
import Navbar from './Nav/Navbar'
import SignIn from './SignIn'
import CreateCharacter from './CreateCharacter'
import CharacterCardsContainer from './Containers/CharacterCardsContainer'
import CharacterSheet from './Characters/CharacterSheet'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'



class Home extends Component {
  constructor(props) {
    super(props)

    this.homeDiv = React.createRef()
  }

  componentDidMount() {
    setTimeout(() => {
      this.homeDiv.current.className = 'home'
    }, 500)
  }

  render() {
    const { currentUser, characterCreated } = this.props
    return (
      <div className="home hidden" ref={this.homeDiv}>
        <Router>
          <React.Fragment>
            <Navbar />
            <Route exact path="/signin" render={() => (currentUser ? <Redirect to="characters"/> : <SignIn />)} />
            <Route exact path="/create" render={() => (characterCreated ? <Redirect to="characters" /> : <CreateCharacter />)} />
            <Route exact path="/characters" component={CharacterCardsContainer} />
            <Route path="/characters/:id" render={props => <CharacterSheet {...props} />} />
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

export default connect(mapStateToProps)(Home)
