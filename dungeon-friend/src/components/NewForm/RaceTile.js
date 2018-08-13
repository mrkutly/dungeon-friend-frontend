import React from 'react'

const RaceTile = (props) => {
  const { race } = props

  return (
    <div>
      <p>{race.name}</p>
    </div>
  )
}

export default RaceTile
