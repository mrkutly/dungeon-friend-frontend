import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dice } from '../../Dice'
import { Adapter } from '../../Adapter'
import { Container } from 'semantic-ui-react'


class CharacterSheet extends Component {

  render() {
    const { character } = this.props
    console.log(character)

    return (
      <Container>
        <h1>{character.name}</h1>
      </Container>
    )
  }
}

const mapStateToProps = (state, _props) => {
  const id = parseInt(_props.match.params.id, 10)
  const character = state.characters.find(char => { return char.id === id })
  return {
    character
  }
}

export default connect(mapStateToProps)(CharacterSheet)
