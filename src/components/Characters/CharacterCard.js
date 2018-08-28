import React from 'react'


const CharacterCard = (props) => {
  const { character } = props
  return (
    <div>
      <div>
        {character.name}
      </div>
      <div>
        {`Level ${character.level} ${character.race.name} ${character.job.name}`}
      </div>
    </div>
  )
}

export default CharacterCard
