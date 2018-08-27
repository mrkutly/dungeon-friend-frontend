import React, { Component } from 'react'
import Adapter from '../../Adapter'
import RaceTile from '../Tiles/RaceTile'
import RaceDisplay from '../Tiles/RaceDisplay.js'

class RaceTilesContainer extends Component {

  state = {
    currentRace: null
  }

  setCurrentRace = (raceId) => {
    Adapter.get(`races/${raceId}`)
      .then(currentRace => {
        this.setState({ currentRace })
      })
  }

  removeCurrentRace = () => {
    this.setState({ currentRace: null })
  }

  raceTiles = () => {
    return this.props.races.map(race => (
      <RaceTile race={race} key={race.name} setCurrentRace={this.setCurrentRace} />
    ))
  }

  render(){
    const { currentRace } = this.state

    return (
      <div className='flex-container'>
        { currentRace ? <RaceDisplay race={this.state.currentRace} back={this.removeCurrentRace} /> : this.raceTiles() }
      </div>  
    )
  }
}

export default RaceTilesContainer
