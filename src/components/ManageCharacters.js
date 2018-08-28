import React from 'react'
import CharacterSheet from './Characters/CharacterSheet'
import CharactersListContainer from './Containers/CharactersListContainer.js'
import { connect } from 'react-redux'

const ManageCharacters = (props) => {
  console.log(props.characters)
  return (
    <div>
      <CharacterSheet />
      <CharactersListContainer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters
  }
}

export default connect(mapStateToProps)(ManageCharacters)
