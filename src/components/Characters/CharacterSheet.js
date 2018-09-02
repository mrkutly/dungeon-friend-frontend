import React from 'react'
import { connect } from 'react-redux'

const CharacterSheet = (props) => {
  const { character } = props
  console.log(character)
  return (
    <h1> I'm a character sheet</h1>
  )
}

const mapStateToProps = (state, _props) => {
  const id = parseInt(_props.match.params.id, 10)
  const character = state.characters.find(char => { return char.id === id })
  return {
    character
  }
}

export default connect(mapStateToProps)(CharacterSheet)
