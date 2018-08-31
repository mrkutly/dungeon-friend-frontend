import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button } from 'semantic-ui-react'
import Adapter from '../../Adapter'

class SelectStartingEquipment extends Component {

  state = {
    starting: [],
    choices: [],
    choice1: [],
    choice2: [],
    choice3: [],
    choice4: [],
    choice5: [],
    choice6: []
  }

  componentDidMount() {
    const { url } = this.props
    Adapter.getStartingEquipment(url)
      .then(({ starting, choices }) => this.setState({ starting, choices }))
  }

  handleCheckboxChange = (e, num, list) => {
    const choseEquipment = e.target.value
    // Checks to see if already selected. If it is, unselect it
    if (this.state[list].includes(choseEquipment)) {
      const filteredEquipment = this.state[list].filter(prof => prof !== choseEquipment)
      this.setState({ [list]: filteredEquipment })

    // Checks to see how many have been selected
    } else if (this.state[list].length < num) {
      this.setState(prevState => {
        return {
          [list]: [...prevState[list], choseEquipment]
        }
      })

    // If the max number have already been selcted, remove the last one and replace it
    } else {
      this.setState(prevState => {
        prevState[list].pop()
        return {
          [list]: [...prevState[list], choseEquipment]
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

    let equipmentList = [...starting]

    //get the full equipment object, not just this name
    choices.forEach(choice => {
      choice.from.forEach(equipment => {
        if (selected.includes(equipment.item.name)) {
          equipmentList.push(equipment)
        }
      })
    })

    this.props.setStartingEquipment(equipmentList)
    e.target.textContent = "Saved!"
  }

  // choices the user must make
  mappedChoices = () => {
    const { choices } = this.state
    let i = 1

    return choices.map(choice => {
      let list = `choice${i}`
      ++i

      return (
        <div key={`equipmentChoice${i}`}>
          <p>Choose {choice.choose} from</p>

          <ul>
            {choice.from.map(equipment => {
              return (
                <li key={equipment.item.name}>

                  <input type="checkbox"
                    value={equipment.item.name}
                    onChange={(e) => this.handleCheckboxChange(e, choice.choose, list)}
                    checked={(this.state[list].includes(equipment.item.name) ? true : false)}
                  />

                  <label> {equipment.quantity} {equipment.item.name}</label>
                </li>
              )
            })}
          </ul>
        </div>
      )
    })
  }

  // these are the ones automatically selected
  mappedStarting = () => {
    const { starting } = this.state

    return starting.map(equipment => {
      const { item, quantity, prerequisites} = equipment
      return (
        <li key={item.name}>
          {quantity} {item.name}
            <i>{prerequisites ? ` - Prerequisites:${prerequisites.map(pre => ` Proficiency in ${pre.proficiency.name}.`)}` : null}</i>
        </li>
      )
    })
  }

  render() {
    return (
      <Modal trigger={<Button type="button">Choose your starting equipment</Button>}>
        <Modal.Header>Starting Equipment</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>Standard Equipment:</Header>
            <ul>
              {this.mappedStarting()}
            </ul>

            <Header>Choices:</Header>
            {this.mappedChoices()}

          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.handleSave}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.currentJob.data.starting_equipment.url
  }
}

export default connect(mapStateToProps)(SelectStartingEquipment)
