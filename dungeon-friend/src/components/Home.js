import React, { Component } from 'react'
import Navbar from './Navbar'
import SignIn from './SignIn'
import CreateCharacter from './CreateCharacter'
import ManageCharacter from './ManageCharacter'


class Home extends Component {
  constructor(props) {
    super(props)

    this.homeDiv = React.createRef()

    this.state = {
      currentPage: 'signIn'
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

  render() {
    return <div className="home hidden" ref={this.homeDiv}>
      <Navbar setCurrentPage={this.setCurrentPage} />
      {this.state.currentPage === 'signIn' ? <SignIn setUserId={this.props.setUserId} /> : null }
      {this.state.currentPage === 'createCharacter' ? <CreateCharacter /> : null }
      {this.state.currentPage === 'manageCharacter' ? <ManageCharacter /> : null }
    </div>
  }
}

export default Home
