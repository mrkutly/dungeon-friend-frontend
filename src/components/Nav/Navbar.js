import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import ThreeScene from '../Logo/ThreeScene'
import { setCurrentPage, logout } from '../../redux/actions'

class Navbar extends Component {

  handleClick = (e, { name }) => this.props.setCurrentPage(name)

  handleLogout = (e, { name }) => {
    localStorage.clear()
    this.props.logout()
    this.props.setCurrentPage(name)
  }

  render() {
    const { currentPage, currentUser } = this.props

    return (
      <React.Fragment>
        <div id="lilac-background">
          <ThreeScene rotation={[0, 0.008]} sizeDivisor={30} />
          <ThreeScene rotation={[0.008, 0]} sizeDivisor={20} />
          <ThreeScene rotation={[0, -0.008]} sizeDivisor={10} />
          <div className="site-name"> Dungeon Friend </div>
          <ThreeScene rotation={[0, -0.008]} sizeDivisor={10} />
          <ThreeScene rotation={[0.008, 0]} sizeDivisor={15} />
          <ThreeScene rotation={[0, 0.008]} sizeDivisor={30} />
        </div>
        <Menu inverted>

          {
            !!currentUser ?
              <NavLink to="/create">
                <Menu.Item
                  name="create"
                  active={currentPage === "create"}
                  onClick={this.handleClick}
                  as="div"
                />
              </NavLink>
            :
              null
          }

          {
            !!currentUser ?
              <NavLink to="/characters">
                <Menu.Item
                  name="characters"
                  active={currentPage === "characters"}
                  onClick={this.handleClick}
                  as="div"
                />
              </NavLink>
            :
              null
          }


          {
            !currentUser ?
              <NavLink to="/signin">
                <Menu.Item
                  name="signin"
                  active={currentPage === "sign in"}
                  onClick={this.handleClick}
                  as="div"
                />
              </NavLink>
            :
              <NavLink to="/signin">
                <Menu.Item
                  name="logout"
                  active={currentPage === "logout"}
                  onClick={this.handleLogout}
                  as="div"
                />
              </NavLink>
          }
        </Menu>
        </React.Fragment>


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
    setCurrentPage: (page) => dispatch( setCurrentPage(page) ),
    logout: () => dispatch( logout() )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
