import React from 'react'
import CharacterCard from '../Characters/CharacterCard'
import { connect } from 'react-redux'
import { characterCreatedFalse } from '../../redux/actions'

const CharacterCardsContainer = (props) => {
  setTimeout(() => {
    props.characterCreatedFalse()
  }, 1000)

  const mappedCharacters = props.characters.map(char => <CharacterCard key={char.id} character={char} />)

  return (
    <React.Fragment>
      <h1 className="center">Your Characters</h1>
      <div className="wrapper">
        {mappedCharacters}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters
  }
}

export default connect(mapStateToProps, { characterCreatedFalse })(CharacterCardsContainer)
