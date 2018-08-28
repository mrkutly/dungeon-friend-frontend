import React, { Component } from 'react'
import Navbar from './Nav/Navbar'
import SignIn from './SignIn'
import CreateCharacter from './CreateCharacter'
import CharacterCardsContainer from './Containers/CharacterCardsContainer'
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
    const { currentPage } = this.props

    return (
      <div className="home hidden" ref={this.homeDiv}>
        <Navbar />
        <div className="page-body">
          {currentPage === 'signIn' ? <SignIn setCurrentUser={this.setCurrentUser} /> : null }
          {currentPage === 'createCharacter' ? <CreateCharacter /> : null }
          {currentPage === 'characters' ? <CharacterCardsContainer /> : null }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps)(Home)
