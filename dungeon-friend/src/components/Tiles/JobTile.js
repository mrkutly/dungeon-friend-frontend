import React from 'react'

const JobTile = (props) => {

  const { job, setCurrentJob } = props

  const handleClick = (e) => {
    e.preventDefault()
    setCurrentJob(job.id)
  }

  return (
    <li>
      <a href="#" onClick={handleClick}>{job.name}</a>
    </li>
  )
}

export default JobTile
