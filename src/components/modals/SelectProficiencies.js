import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button } from 'semantic-ui-react'

class SelectProficiencies extends Component {

  state = {
    starting: [...this.props.starting],
    choices: [...this.props.choices],
    choice1: [],
    choice2: [],
    choice3: [],
    choice4: [],
    choice5: [],
    choice6: []
  }

  handleCheckboxChange = (e, num, list) => {
    const chosenProf = e.target.value
    // Checks to see if already selected. If it is, unselect it
    if (this.state[list].includes(chosenProf)) {
      const filteredProfs = this.state[list].filter(prof => prof !== chosenProf)
      this.setState({ [list]: filteredProfs })

    // Checks to see how many have been selected
    } else if (this.state[list].length < num) {
      this.setState(prevState => {
        return {
          [list]: [...prevState[list], chosenProf]
        }
      })
    } else {
      this.setState(prevState => {
        prevState[list].pop()
        return {
          [list]: [...prevState[list], chosenProf]
        }
      })
    }
  }

  handleSave = (e) => {
    const { choices, choice1, choice2, choice3, choice4, choice5, choice6, starting } = this.state

    const selected = [
      ...choice1, ...choice2,
      ...choice3, ...choice4,
      ...choice5, ...choice6
    ]

    let proficiencyList = [...starting]

    //get the full proficiency object, not just this name
    choices.forEach(choice => {
      choice.from.forEach(proficiency => {
        if (selected.includes(proficiency.name)) {
          proficiencyList.push(proficiency)
        }
      })
    })

    this.props.setProficiencies(proficiencyList)
    e.target.textContent = "Saved!"
  }


  mappedProfiencyChoices = () => {
    let i = 1

    return this.props.choices.map(prof => {
      // Chooses which array in state to compare selected proficiencies to
      let list = `choice${i}`
      ++i

      return (
        <div key={prof.from[0].name}>
          <p>Choose {prof.choose} from</p>
          <ul>
            {prof.from.map(choice => (
              <li key={choice.url}>

                <input type="checkbox"
                  value={choice.name}
                  onChange={(e) => this.handleCheckboxChange(e, prof.choose, list)}
                  checked={(this.state[list].includes(choice.name) ? true : false)}
                />

                <label>{choice.name}</label>
              </li>))}
          </ul>
        </div>
      )
    })
  }

  mappedStarting = () => {
    return this.state.starting.map(prof => <li key={prof.name}>{prof.name}</li>)
  }

  render() {
    const { starting } = this.state

    return (
      <Modal trigger={<Button type="button">Choose your proficiencies</Button>}>
        <Modal.Header>Proficiencies</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>Starting Proficiencies:</Header>
            <ul>
              {starting.length > 0 ? this.mappedStarting() : "None"}
            </ul>

            <Header>Choices:</Header>
            {this.mappedProfiencyChoices()}


          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" onClick={this.handleSave} primary>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  const jobChoices = state.currentJob.data.proficiency_choices
  const raceChoices = (state.currentRace.data.starting_proficiency_options || {})
  const jobProfs = state.currentJob.data.proficiencies
  const raceProfs = state.currentRace.data.starting_proficiencies

  return {
    starting: [...jobProfs, ...raceProfs],
    choices: [...jobChoices, ...raceChoices]
  }
}

export default connect(mapStateToProps)(SelectProficiencies)
