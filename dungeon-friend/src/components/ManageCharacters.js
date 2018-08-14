import React from 'react'
import CharacterSheet from './Characters/CharacterSheet'
import CharactersListContainer from './Containers/CharactersListContainer.js'

const ManageCharacters = (props) => {

  return (
    <div>
      <CharacterSheet />
      <CharactersListContainer />
    </div>
  )
}

export default ManageCharacters
