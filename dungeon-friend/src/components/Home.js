import React, { Component } from 'react'
import Navbar from './Navbar'
import SignIn from './SignIn'
import CreateCharacter from './CreateCharacter'
import ManageCharacters from './ManageCharacters'


class Home extends Component {
  constructor(props) {
    super(props)

    this.homeDiv = React.createRef()

    this.state = {
      currentPage: 'signIn',
      currentUser: null
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.homeDiv.current.className = 'home'
    }, 500)
  }

  setCurrentPage = (pageName) => {
    this.setState({
      currentPage: pageName
    })
  }

  setCurrentUser = (currentUser) => {
    this.setState({ currentUser, currentPage: 'manageCharacter' })
  }


  render() {
    const { currentUser, currentPage } = this.state
    
    return <div className="home hidden" ref={this.homeDiv}>
      <Navbar setCurrentPage={this.setCurrentPage} currentUser={currentUser} />
      {currentPage === 'signIn' ? <SignIn setCurrentUser={this.setCurrentUser} /> : null }
      {currentPage === 'createCharacter' ? <CreateCharacter userId={currentUser.id}/> : null }
      {currentPage === 'manageCharacter' ? <ManageCharacters currentUser={currentUser}/> : null }
    </div>
  }
}

export default Home
