import React from 'react'
import CharacterSheet from './ManageCharacters/CharacterSheet'
import CharactersListContainer from './ManageCharacters/CharactersListContainer'

const ManageCharacters = (props) => {

  return (
    <div>
      <CharacterSheet />
      <CharactersListContainer />
    </div>
  )
}

export default ManageCharacters
