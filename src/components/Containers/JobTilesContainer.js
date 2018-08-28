import React, { Component } from 'react'
import Adapter from '../../Adapter'
import JobTile from '../Tiles/JobTile'
import JobDisplay from '../Tiles/JobDisplay.js'
import { connect } from 'react-redux'
import { setCurrentJob, setJobs } from '../../redux/actions.js'


class JobTilesContainer extends Component {

  componentDidMount() {
    Adapter.get('jobs').then(({ jobs }) => this.props.setJobs(jobs))
  }

  setCurrentJob = (jobId) => {
    Adapter.get(`jobs/${jobId}`)
      .then(currentJob => {
        this.props.setCurrentJob(currentJob)
      })
  }

  removeCurrentJob = () => {
    this.props.setCurrentJob(null)
  }

  jobTiles = () => {
    return this.props.jobs.map(job => (
      <JobTile key={ job.name } job={ job } setCurrentJob={this.setCurrentJob} />
    ))
  }

  render() {
    const { currentJob } = this.props

    return (
      <div>
        <div className="flex-container">
          { currentJob ? <JobDisplay job={currentJob} back={this.removeCurrentJob} /> : this.jobTiles() }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentJob: (job) => { dispatch( setCurrentJob(job) ) },
    setJobs: (jobs) => { dispatch( setJobs(jobs) )}
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs,
    currentJob: state.currentJob
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobTilesContainer)
