import React, { Component } from 'react'
import Adapter from '../Adapter'
import RaceTilesContainer from './Containers/RaceTilesContainer'
import JobTilesContainer from './Containers/JobTilesContainer'
import { connect } from 'react-redux'
import { createNewCharacter, addCharacter, characterCreatedTrue, setCurrentPage } from '../redux/actions.js'
import SelectLanguages from './modals/SelectLanguages'
import SelectStartingEquipment from './modals/SelectStartingEquipment'
import SelectTraits from './modals/SelectTraits'
import SelectProficiencies from './modals/SelectProficiencies'
import RollStats from './modals/RollStats'
import { Form } from 'semantic-ui-react'


class CreateCharacter extends Component {

  state = {
    abilityScores: {
      strength: 0,
      constitution: 0,
      dexterity: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    },
    languages: null,
    name: '',
    proficiencies: null,
    startingEquipment: null,
    startingLvl: 1,
    traits: null
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
        languages: null,
        traits: null
      })
    }
  }

  componentWillMount() {
    this.props.setCurrentPage("create")
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
    } else if (this.state.abilityScores !== nextState.abilityScores) {
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

    const { name, startingLvl, languages, startingEquipment, proficiencies, traits, abilityScores } = this.state
    const { currentJob, currentRace, currentUser } = this.props
    const user_id = currentUser.id

    if (!name) {
      alert("Please give your character a name.")
      return
    } else if (!currentRace) {
      alert("Please select a race.")
      return
    } else if (!currentJob) {
      alert("Please select a class.")
      return
    } else if(!proficiencies) {
      alert("Please choose your proficiencies.")
      return
    } else if (Object.values(abilityScores).some(score => score === 0)) {
      alert("Please roll for stats.")
      return
    } else if (!startingEquipment) {
      alert("Please select your starting equipment.")
      return
    }

    return {
      hit_die: currentJob.data.hit_die,
      charisma: abilityScores.charisma,
      constitution: abilityScores.constitution,
      dexterity: abilityScores.dexterity,
      equipment: startingEquipment,
      intelligence: abilityScores.intelligence,
      job_id: currentJob.id,
      languages,
      level: startingLvl,
      name,
      proficiencies,
      race_id: currentRace.id,
      strength: abilityScores.strength,
      user_id,
      traits,
      wisdom: abilityScores.wisdom
    }
  }

  setAbilityScores = (scores) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        abilityScores: { ...scores }
      }
    })
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
        <div className="center-text">Create a Character</div>
        <Form onSubmit={this.handleSubmit}>

          <div className="large-header">Name</div> <br />
          <Form.Input type="text" value={name} onChange={this.handleNameChange} />
          <br />

          <div className="large-header">Starting Level</div> <br />
          <Form.Input type="number" min="1" max="99" value={startingLvl} onChange={this.handleLvlChange}/>
          <br />

          <div className="grid">
            <div className="race-container">
              <div className="large-header">Race</div> <br />
              <RaceTilesContainer />
            </div>
            <br />
            <div className="class-container">
              <div className="large-header">Class</div> <br />
              <JobTilesContainer />
            </div>
            <br />
          </div>

          {/* Conditionally render buttons that open modals for options based on race or job */}
          { currentRace && currentRace.data.language_options ? <SelectLanguages setLanguages={this.setLanguages} /> : null }

          { currentJob ? <SelectStartingEquipment setStartingEquipment={this.setStartingEquipment} /> : null }

          { currentRace && currentRace.data.trait_options ? <SelectTraits setTraits={this.setTraits} /> : null }

          { currentRace && currentJob ? <SelectProficiencies setProficiencies={this.setProficiencies} /> : null }

          { currentRace && currentJob ? <RollStats setAbilityScores={this.setAbilityScores} /> : null }
          {/* Find a way to disable these buttons until a user is signed in and everything else is selected */}
          <br />
          <br />
          <Form.Button basic color="violet">Create</Form.Button>
        </Form>
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

export default connect(mapStateToProps, { createNewCharacter, addCharacter, characterCreatedTrue, setCurrentPage })(CreateCharacter)
