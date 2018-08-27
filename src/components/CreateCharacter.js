import React, { Component } from 'react'
import Adapter from '../Adapter'
import RaceTilesContainer from './Containers/RaceTilesContainer'
import JobTilesContainer from './Containers/JobTilesContainer'

class CreateCharacter extends Component {

  state = {
    jobs: [],
    races: [],
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

  componentDidMount() {
    Adapter.get('jobs').then(({ jobs }) => this.setState({ jobs }))
    Adapter.get('races').then(({ races }) => this.setState({ races }))
  }

  render() {
    const { races, jobs, name, startingLvl } = this.state
    return (
      <div>
        <form>

          <h1>Name</h1>
          <input type="text" value={name} onChange={this.handleNameChange} />

          <h1>Starting Level</h1>
          <input type="number" min="1" max="99" value={startingLvl} onChange={this.handleLvlChange}/>

          <div className="grid">
            <div className="race-container">
              <h1>Race</h1>
              <RaceTilesContainer setRaceId={this.setRaceId} races={races} />
            </div>

            <div className="class-container">
              <h1>Class</h1>
              <JobTilesContainer setClassId={this.setJobId} jobs={jobs} />
            </div>
          </div>

          <button className="create-button" type="submit">Create</button>
        </form>
      </div>
    )
  }
}

export default CreateCharacter
