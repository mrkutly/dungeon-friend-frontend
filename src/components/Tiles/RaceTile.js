import React from 'react'

const RaceTile = (props) => {

  const { race, setCurrentRace } = props

  const handleClick = (e) => {
    e.preventDefault()
    setCurrentRace(race.id)
  }

  return (
    <div className="tile" onClick={handleClick}>
      <p>{race.name}</p>
    </div>
  )
}

export default RaceTile
