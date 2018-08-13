import React, { Component } from 'react'
import Adapter from '../../Adapter'

class JobDisplay extends Component{

  state = {
    jobData: {}
  }

  render() {
    console.log(this.props)
    const { jobData } = this.state

    return (
      <div>
        <h1>{this.props.job.name}</h1>
      </div>
    )
  }
}

export default JobDisplay
