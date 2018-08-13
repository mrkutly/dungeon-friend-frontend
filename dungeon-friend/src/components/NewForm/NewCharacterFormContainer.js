import React, { Component } from 'react'

class NewCharacterFormContainer extends Component {

  state = {
    name: '',
    startingLvl: 1,
    raceId: null,
    jobId: null,
    subRaceId: null,
    subClassId: null,
    magicSchoolId: null
  }

  handleLvlChange = (e) => {
    this.setState({ name: e.target.value })
  }

  handleNameChange = (e) => {
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
      <form>
        <h1>Name</h1>
        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        <h1>Starting Level</h1>
        <input type="number" min="1" max="99" value={this.state.startingLvl} onChange={this.handleLvlChange}/>
        <h1>Race</h1>
        <RaceTilesContainer setRaceId={this.setRaceId}/>
        <h1>Class</h1>
        <ClassTilesContainer setClassId={this.setClassId}/>
        <button type="submit">Create</button>
      </form>
    )
  }
}

export default NewCharacterFormContainer
