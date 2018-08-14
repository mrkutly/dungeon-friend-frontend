import React from 'react'

const JobTile = (props) => {

  const { job, setCurrentJob } = props

  const handleClick = (e) => {
    setCurrentJob(job.id)
  }

  return (
    <div onClick={handleClick}>
      <p>{job.name}</p>
    </div>
  )
}

export default JobTile
