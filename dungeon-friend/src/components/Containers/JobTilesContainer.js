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

  jobTiles = () => {
    return this.props.jobs.map(job => (<JobTile key={ job.name } job={ job } setCurrentJob={this.setCurrentJob} />))
  }

  render() {
    const { currentJob } = this.state

    return (
      <div>
        { currentJob ? <JobDisplay job={this.state.currentJob} /> : null }
        { this.jobTiles() }
      </div>
    )
  }
}

export default JobTilesContainer
