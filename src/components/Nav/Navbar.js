import React, { Component } from 'react'
// import Navigation from './Navigation'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { setCurrentPage } from '../../redux/actions'

class Navbar extends Component {
  // constructor(props) {
  //   super(props)
  //
  //   this.navbarDiv = React.createRef()
  // }
  //
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.navbarDiv.current.className = 'navbar'
  //   }, 500)
  // }
  // this would be a nice color #7d507a
  handleClick = (e, { name }) => this.props.setCurrentPage(name)

  render() {
    const { currentPage } = this.props

    return (
      // <Segment inverted>
        <Menu inverted>
          {/* <Logo /> */}

          <NavLink to="/create">
          <Menu.Item
            name="create"
            active={currentPage === "create"}
            onClick={this.handleClick}
            color="violet"
            as="div"
          />
          </NavLink>

          <NavLink to="/characters">
          <Menu.Item
            name="characters"
            active={currentPage === "characters"}
            onClick={this.handleClick}
            color="violet"
            as="div"
          />
          </NavLink>

          <NavLink to="/signin">
          <Menu.Item
            name="signin"
            active={currentPage === "signin"}
            onClick={this.handleClick}
            color="violet"
            as="div"
            disabled={!!this.props.currentUser}
          />
        </NavLink>
        </Menu>
      // </Segment>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentPage: state.currentPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentPage: (page) => dispatch( setCurrentPage(page) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

// {/* <div className="navbar hidden" ref={this.navbarDiv}> */}
//   {/* <Logo />
//   <Navigation /> */}
// {/* </div> */}
