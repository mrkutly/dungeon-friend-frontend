import React, { Component } from 'react'
// import Navigation from './Navigation'
import { NavLink } from 'react-router-dom'
import ThreeScene from '../Logo/ThreeScene'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { setCurrentPage } from '../../redux/actions'

class Navbar extends Component {

  handleClick = (e, { name }) => this.props.setCurrentPage(name)

  // mappedNavLinks = ()

  render() {
    const { currentPage } = this.props

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
          <NavLink to="/create">
            <Menu.Item
              name="create"
              active={currentPage === "create"}
              onClick={this.handleClick}
              as="div"
            />
          </NavLink>

          <NavLink to="/characters">
            <Menu.Item
              name="characters"
              active={currentPage === "characters"}
              onClick={this.handleClick}
              as="div"
            />
          </NavLink>

          <NavLink to="/signin">
            <Menu.Item
              name="signin"
              active={currentPage === "signin"}
              onClick={this.handleClick}
              as="div"
              disabled={!!this.props.currentUser}
            />
          </NavLink>
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
    setCurrentPage: (page) => dispatch( setCurrentPage(page) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

// {/* <div className="navbar hidden" ref={this.navbarDiv}> */}
//   {/* <Logo />
//   <Navigation /> */}
// {/* </div> */}
