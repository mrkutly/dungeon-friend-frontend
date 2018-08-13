import React, { Component } from 'react'
import Adapter from '../../Adapter'
import RaceTile from './RaceTile'

class RaceTilesContainer extends Component {

  state = {
    races: []
  }

  raceTiles = () => {
    return this.state.races.map(race => (<RaceTile race={race} key={race.name} />))
  }

  componentDidMount() {
    Adapter.get('races')
      .then(({ races }) => {
        this.setState({ races })
      })
  }

  render(){
    return (
      <div>
        {this.raceTiles()}
      </div>
    )
  }
}

export default RaceTilesContainer
