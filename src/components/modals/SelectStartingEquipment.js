import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'
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
    // Checks to see if already selected. If it is, unselect it
    if (this.state[list].includes(e.target.value)) {
      const filteredProfs = this.state[list].filter(prof => prof !== e.target.value)
      this.setState({ [list]: filteredProfs })

    // Checks to see how many have been selected
    } else if (this.state[list].length < num) {
      const prof = e.target.value
      this.setState(prevState => {
        return {
          [list]: [...prevState[list], prof]
        }
      })
    }
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
    console.log(this.state)
    const { choices } = this.state
    return (
      <Modal trigger={<Button type="button">Choose your starting equipment</Button>}>
        <Modal.Header>Starting Equipment</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>Starting Equipment:</Header>
            <ul>
              {this.mappedStarting()}
            </ul>

            <Header>Choices:</Header>
            {this.mappedChoices()}

          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Proceed <Icon name='right chevron' />
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
