import React from 'react'
import CharacterCard from '../Characters/CharacterCard'
import { connect } from 'react-redux'

const CharacterCardsContainer = (props) => {
  console.log(props.characters)
  const mappedCharacters = props.characters.map(char => <CharacterCard key={char.name} character={char} />)

  return (
    <div>
      {mappedCharacters}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters
  }
}

export default connect(mapStateToProps)(CharacterCardsContainer)
