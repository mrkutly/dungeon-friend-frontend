import React, { Component } from 'react'
import Adapter from '../../Adapter'
import JobTile from '../Tiles/JobTile'
import JobDisplay from '../Tiles/JobDisplay.js'

class JobTilesContainer extends Component {

  state = {
    currentJob: null
  }

  setCurrentJob = (jobId) => {
    Adapter.get(`jobs/${jobId}`)
      .then(currentJob => {
        this.setState({ currentJob })
      })
  }

  removeCurrentJob = () => {
    this.setState({ currentJob: null })
  }

  jobTiles = () => {
    return this.props.jobs.map(job => (
      <JobTile key={ job.name } job={ job } setCurrentJob={this.setCurrentJob} />
    ))
  }

  render() {
    const { currentJob } = this.state

    return (
      <div>
        <div className="flex-container">
          { currentJob ? <JobDisplay job={this.state.currentJob} back={this.removeCurrentJob} /> : this.jobTiles() }
        </div>
      </div>
    )
  }
}

export default JobTilesContainer
