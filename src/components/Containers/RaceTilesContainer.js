import React, { Component } from 'react'
import Adapter from '../../Adapter'
import RaceTile from '../Tiles/RaceTile'
import RaceDisplay from '../Tiles/RaceDisplay.js'
import { connect } from 'react-redux'
import { setCurrentRace, setRaces } from '../../redux/actions.js'


class RaceTilesContainer extends Component {

  componentDidMount() {
    Adapter.get('races').then(({ races }) => this.props.setRaces(races))
  }

  setCurrentRace = (raceId) => {
    Adapter.get(`races/${raceId}`)
      .then(currentRace => {
        this.props.setCurrentRace(currentRace)
      })
  }

  removeCurrentRace = () => {
    this.props.setCurrentRace(null)
  }

  raceTiles = () => {
    return this.props.races.map(race => (
      <RaceTile race={race} key={race.name} setCurrentRace={this.setCurrentRace} />
    ))
  }

  render(){
    const { currentRace } = this.props

    return (
      <div className='flex-container'>
        { currentRace ? <RaceDisplay race={currentRace} back={this.removeCurrentRace} /> : this.raceTiles() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    races: state.races,
    currentRace: state.currentRace
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRaces: (races) => { dispatch( setRaces(races) )},
    setCurrentRace: (race) => { dispatch( setCurrentRace(race) )}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RaceTilesContainer)
