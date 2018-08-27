import React from 'react'

const JobTile = (props) => {

  const { job, setCurrentJob } = props

  const handleClick = (e) => {
    e.preventDefault()
    setCurrentJob(job.id)
  }

  return (
    <div className="tile" onClick={handleClick}>
      <p>{job.name}</p>
    </div>
  )
}

export default JobTile
