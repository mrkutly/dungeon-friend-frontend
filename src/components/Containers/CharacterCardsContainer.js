import React from 'react'
import CharacterCard from '../Characters/CharacterCard'
import { connect } from 'react-redux'

const CharacterCardsContainer = (props) => {
  const mappedCharacters = props.characters.map(char => <CharacterCard key={char.id} character={char} />)

  return (
    <div className="wrapper">
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
