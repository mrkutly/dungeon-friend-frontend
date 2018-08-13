import React, { Component } from 'react'
import Adapter from '../../Adapter'
import JobTile from './JobTile'
import JobDisplay from './JobDisplay'

class JobTilesContainer extends Component {

  state = {
    currentJob: {},
    jobs: []
  }

  componentDidMount() {
    Adapter.get('jobs')
      .then(({ jobs }) => {
        this.setState({ jobs: jobs, currentJob: jobs[0] })
      })
  }

  jobTiles = () => {
    return this.state.jobs.map(job => (<JobTile key={ job.name } job={ job } />))
  }

  render() {
    console.log(this.state)
    return (
      <div>
        { this.state.jobs.length === 0 ? <JobDisplay job={this.state.currentJob} /> : null }
        {this.jobTiles()}
      </div>
    )
  }
}

export default JobTilesContainer
