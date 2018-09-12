import React from 'react'
import { NavLink } from 'react-router-dom'

const link = {
  textDecoration: "none"
}

const CharacterCard = (props) => {
  const { character } = props
  return (
    <NavLink to={`/characters/${character.id}`} style={link}>
      <div className="card">
        <h2>
          {character.name}
        </h2>
        <h4>
          {`Level ${character.level} ${character.race.name} ${character.job.name}`}
        </h4>
      </div>
    </NavLink>
  )
}

export default CharacterCard
