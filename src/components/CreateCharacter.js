import React, { Component } from 'react'
import Adapter from '../Adapter'
import RaceTilesContainer from './Containers/RaceTilesContainer'
import JobTilesContainer from './Containers/JobTilesContainer'
import { connect } from 'react-redux'
import { createNewCharacter, addCharacter, characterCreatedTrue } from '../redux/actions.js'
import SelectLanguages from './modals/SelectLanguages'
import SelectStartingEquipment from './modals/SelectStartingEquipment'
import SelectTraits from './modals/SelectTraits'
import SelectProficiencies from './modals/SelectProficiencies'

class CreateCharacter extends Component {

  state = {
    languages: [],
    name: '',
    proficiencies: [],
    startingEquipment: [],
    startingLvl: 1,
    traits: []
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentJob, currentRace } = this.props
    const raceAdded = (currentRace && !prevProps.currentRace)
    const jobAdded = (currentJob && !prevProps.currentJob)
    const jobAndRaceSelected = (currentJob && currentRace)
    const raceRemoved = (!currentRace && prevProps.currentRace)

    // Set default proficiencies when both race and job are selected
    if (( raceAdded || jobAdded ) && jobAndRaceSelected ) {
      const proficiencies =[...currentJob.data.proficiencies, ...currentRace.data.starting_proficiencies]
      this.setState({ proficiencies })
    }

    // if we are getting currentRace for the first time, set default languages
    if (raceAdded) {
      const { languages, traits } = this.props.currentRace.data
      const formattedLanguages = languages.map(lang => lang.name)
      const formattedTraits = traits.map(trait => trait.name)

      this.setState({
        languages: formattedLanguages,
        traits: formattedTraits
      })
    // if currentRace has been removed, remove languages and traits
    } else if (raceRemoved) {
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
    } else if (this.state.proficiencies !== nextState.proficiencies) {
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
    if (!character) return

    Adapter.createCharacter(character)
      .then(({ character }) => this.props.addCharacter(character))
      .then(char => this.props.characterCreatedTrue())
  }

  newCharacter = () => {
    if (!this.props.currentUser) {
      alert("sign in to create a character")
      return
    }

    const { name, startingLvl, languages, startingEquipment, proficiencies, traits } = this.state
    const { currentJob, currentRace, currentUser } = this.props
    const test_user_id = currentUser.id


    return {
      job_id: currentJob.id,
      languages,
      level: startingLvl,
      name,
      proficiencies,
      race_id: currentRace.id,
      equipment: startingEquipment,
      test_user_id,
      traits
    }
  }

  setLanguages = (languages) => {
    this.setState({ languages })
  }

  setProficiencies = (proficiencies) => {
    this.setState({ proficiencies })
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

          { currentRace && currentJob ? <SelectProficiencies setProficiencies={this.setProficiencies} /> : null }
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

export default connect(mapStateToProps, { createNewCharacter, addCharacter, characterCreatedTrue })(CreateCharacter)
