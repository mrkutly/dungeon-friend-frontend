import React from 'react'

const RaceTile = (props) => {

  const { race, setCurrentRace } = props

  const handleClick = (e) => {
    e.preventDefault()
    setCurrentRace(race.id)
  }

  return (
    <li>
      <a href="#" onClick={handleClick} >{race.name}</a>
    </li>
  )
}

export default RaceTile
