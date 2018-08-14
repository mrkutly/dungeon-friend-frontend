import React from 'react'

const JobDisplay = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.job.data.name}</h1>
    </div>
  )
}

export default JobDisplay
