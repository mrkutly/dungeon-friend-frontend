import React, { Component } from 'react'
import RaceTilesContainer from './NewForm/RaceTilesContainer'
import JobTilesContainer from './NewForm/JobTilesContainer'

class CreateCharacter extends Component {

  state = {
    name: '',
    startingLvl: 1,
    raceId: null,
    jobId: null,
    subRaceId: null,
    subClassId: null,
    magicSchoolId: null
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  handleLvlChange = (e) => {
    this.setState({ startingLvl: e.target.value })
  }

  setName = (name) => {
    this.setState({ name })
  }

  setStartingLvl = (startingLvl) => {
    this.setState({ startingLvl })
  }

  setRaceId = (raceId) => {
    this.setState({ raceId })
  }

  setJobId = (jobId) => {
    this.setState({ jobId })
  }

  setSubRaceId = (subRaceId) => {
    this.setState({ subRaceId })
  }

  setSubClassId = (subClassId) => {
    this.setState({ subClassId })
  }

  setMagicSchoolId = (magicSchoolId) => {
    this.setState({ magicSchoolId })
  }

  render() {
    return (
      <div>
        <form>
          <h1>Name</h1>
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />

          <h1>Starting Level</h1>
          <input type="number" min="1" max="99" value={this.state.startingLvl} onChange={this.handleLvlChange}/>

          <h1>Race</h1>
          <RaceTilesContainer setRaceId={this.setRaceId}/>

          <h1>Class</h1>
          <JobTilesContainer setClassId={this.setJobId}/>
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
}

export default CreateCharacter
