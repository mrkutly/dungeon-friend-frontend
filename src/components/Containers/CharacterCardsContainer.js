import React, { Component } from 'react'
import CharacterCard from '../Characters/CharacterCard'
import { connect } from 'react-redux'
import { characterCreatedFalse, setCurrentPage } from '../../redux/actions'

class CharacterCardsContainer extends Component {

  componentWillMount() {
    this.props.setCurrentPage("characters")
    this.setFalse = setTimeout(() => {
      this.props.characterCreatedFalse()
    }, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.setFalse)
  }

  mappedCharacters = () => {
    return this.props.characters.map(char => <CharacterCard key={char.id} character={char} />)
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="center">Your Characters</h1>
        <div className="wrapper">
          {this.mappedCharacters()}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters
  }
}

export default connect(mapStateToProps, { characterCreatedFalse, setCurrentPage })(CharacterCardsContainer)
