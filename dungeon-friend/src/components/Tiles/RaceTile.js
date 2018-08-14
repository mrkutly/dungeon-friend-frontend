import React from 'react'

const RaceTile = (props) => {

  const { race, setCurrentRace } = props

  const handleClick = (e) => {
    setCurrentRace(race.id)
  }

  return (
    <div onClick={handleClick}>
      <p>{race.name}</p>
    </div>
  )
}

export default RaceTile
