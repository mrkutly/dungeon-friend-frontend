import React from 'react'

const JobTile = (props) => {
  const { job } = props
  return (
    <div>
      <p>{job.name}</p>
    </div>
  )
}

export default JobTile
