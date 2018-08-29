import React, { Component } from 'react'
// import Adapter from '../Adapter'
import RaceTilesContainer from './Containers/RaceTilesContainer'
import JobTilesContainer from './Containers/JobTilesContainer'
import { connect } from 'react-redux'
import { editNewCharacter } from '../redux/actions.js'

class CreateCharacter extends Component {

  state = {
    name: '',
    startingLvl: 1,
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  handleLvlChange = (e) => {
    this.setState({ startingLvl: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const character = this.newCharacter()
    this.props.editNewCharacter(character)
  }

  newCharacter = () => {
    const { name, startingLvl } = this.state
    const job_id = this.props.currentJob.id
    const race_id = this.props.currentRace.id
    const test_user_id = this.props.currentUser.id

    return {
      name,
      level: startingLvl,
      race_id,
      job_id,
      test_user_id
    }
  }

  render() {
    const { name, startingLvl } = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <h1>Name</h1>
          <input type="text" value={name} onChange={this.handleNameChange} />

          <h1>Starting Level</h1>
          <input type="number" min="1" max="99" value={startingLvl} onChange={this.handleLvlChange}/>

          <div className="grid">
            <div className="race-container">
              <h1>Race</h1>
              <RaceTilesContainer />
            </div>

            <div className="class-container">
              <h1>Class</h1>
              <JobTilesContainer />
            </div>
          </div>

          <button className="create-button" type="submit">Next</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentRace: state.currentRace,
    currentJob: state.currentJob,
    currentUser: state.currentUser,
    newCharacter: state.newCharacter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editNewCharacter: (character) => { dispatch( editNewCharacter(character) )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCharacter)
