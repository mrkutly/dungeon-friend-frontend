import React from 'react'

const JobDisplay = (props) => {
  return (
    <h1>{props.job.data.name}</h1>
  )
}

export default JobDisplay
