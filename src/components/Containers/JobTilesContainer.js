import React, { Component } from 'react'
import { connect } from 'react-redux'
import JobTile from '../Tiles/JobTile'
import JobDisplay from '../Tiles/JobDisplay'
import Adapter from '../../Adapter'
import { setCurrentJob, setJobs } from '../../redux/actions'


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
          {
            currentJob ?
            <JobDisplay setProficiencies={this.props.setProficiencies} back={this.removeCurrentJob} />
            :
            <div className="flex-container">{this.jobTiles()} </div>
          }
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
