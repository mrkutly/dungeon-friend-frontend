import React, { Component } from 'react'
// import Adapter from '../Adapter'
import RaceTilesContainer from './Containers/RaceTilesContainer'
import JobTilesContainer from './Containers/JobTilesContainer'
import { connect } from 'react-redux'
import { editNewCharacter } from '../redux/actions.js'
import SelectLanguages from './modals/SelectLanguages'
import SelectStartingEquipment from './modals/SelectStartingEquipment'
import SelectTraits from './modals/SelectTraits'

class CreateCharacter extends Component {

  state = {
    languages: [],
    name: '',
    startingEquipment: [],
    startingLvl: 1,
    traits: []
  }

  componentDidUpdate(prevProps, prevState) {
    // if we are getting currentRace for the first time, set default languages
    if (this.props.currentRace && !prevProps.currentRace) {
      const { languages, traits } = this.props.currentRace.data
      const formattedLanguages = languages.map(lang => lang.name)
      const formattedTraits = traits.map(trait => trait.name)

      this.setState({
        languages: formattedLanguages,
        traits: formattedTraits
      })
    // if currentRace has been removed, remove languages and traits
    } else if (!this.props.currentRace && prevProps.currentRace) {
      this.setState({
        languages: [],
        traits: []
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.currentRace !== nextProps.currentRace) {
      return true
    } else if (this.props.currentJob !== nextProps.currentJob) {
      return true
    } else if (this.state.languages !== nextState.languages) {
      return true
    } else if (this.state.startingEquipment !== nextState.startingEquipment) {
      return true
    } else if (this.state.startingLvl !== nextState.startingLvl) {
      return true
    } else if (this.state.traits !== nextState.traits) {
      return true
    } else if (this.state.name !== nextState.name) {
      return true
    }
    return false
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  handleLvlChange = (e) => {
    this.setState({ startingLvl: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const character = this.newCharacter()
    this.props.editNewCharacter(character)
  }

  newCharacter = () => {
    const { name, startingLvl } = this.state
    const { currentJob, currentRace } = this.props
    const test_user_id = this.props.currentUser.id

    return {
      name,
      level: startingLvl,
      race: currentRace,
      job: currentJob,
      test_user_id
    }
  }

  setLanguages = (languages) => {
    this.setState({ languages })
  }

  setStartingEquipment = (startingEquipment) => {
    this.setState({ startingEquipment })
  }

  setTraits = (traits) => {
    this.setState({ traits })
  }

  render() {
    const { currentRace, currentJob } = this.props
    const { name, startingLvl } = this.state
    console.log(this.state.traits)

    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <h1>Name</h1>
          <input type="text" value={name} onChange={this.handleNameChange} />

          <h1>Starting Level</h1>
          <input type="number" min="1" max="99" value={startingLvl} onChange={this.handleLvlChange}/>

          <div className="grid">
            <div className="race-container">
              <h1>Race</h1>
              <RaceTilesContainer />
            </div>

            <div className="class-container">
              <h1>Class</h1>
              <JobTilesContainer />
            </div>
          </div>

          {/* Conditionally render buttons that open modals for options based on race or job */}
          { currentRace && currentRace.data.language_options ? <SelectLanguages setLanguages={this.setLanguages} /> : null }

          { currentJob ? <SelectStartingEquipment setStartingEquipment={this.setStartingEquipment} /> : null }

          { currentRace && currentRace.data.trait_options ? <SelectTraits setTraits={this.setTraits} /> : null }

          {/* Find a way to disable these buttons until a user is signed in and everything else is selected */}
          <button className="create-button" type="submit">Create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentRace: state.currentRace,
    currentJob: state.currentJob,
    currentUser: state.currentUser,
    newCharacter: state.newCharacter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editNewCharacter: (character) => { dispatch( editNewCharacter(character) )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCharacter)
