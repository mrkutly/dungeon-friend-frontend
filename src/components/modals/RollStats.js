import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button } from 'semantic-ui-react'
import { Dice } from '../../Dice'

class RollStats extends Component {

  state = {
    charisma: null,
    constitution: null,
    dexterity: null,
    intelligence: null,
    strength: null,
    wisdom: null
  }

  roll() {
    const rolls = []
    const currentRoll = []

    for (let i = 0; i < 6; i++) {
      let acc = 0

      for (let k = 0; k < 4; k++) {
        let roll = Dice.d6()
        currentRoll.push(roll)
        acc += roll
      }
      acc = acc - Math.min(...currentRoll)
      rolls.push(acc)
    }
    return rolls
  }

  // make a form that has six sections (one for each number you rolled),
  // each with the six stats as options. When a number is selected in one,
  // disable it in all others

  // implement these ability_bonuses from currentRace
  // <li>Strength: {name === 'Tiefling' ? ability_bonuses[5] : ability_bonuses[0]}</li>
  // <li>Dexterity: {name === 'Tiefling' ? ability_bonuses[4] : ability_bonuses[1]}</li>
  // <li>Constitution: {name === 'Tiefling' ? ability_bonuses[3] : ability_bonuses[2]}</li>
  // <li>Intelligence: {name === 'Tiefling' ? ability_bonuses[2] : ability_bonuses[3]}</li>
  // <li>Wisdom: {name === 'Tiefling' ? ability_bonuses[1] : ability_bonuses[4]}</li>
  // <li>Charisma: {name === 'Tiefling' ? ability_bonuses[0] : ability_bonuses[5]}</li>
  // { name === 'Half-Elf' ? <li>Two other Ability Scores of your choice increase by 1</li> : null }

  render() {
    console.log(this.roll())
    console.log(this.props)
    return (
      <Modal trigger={<Button type="button">Roll for stats</Button>}  closeIcon>
        <Modal.Header>Stats</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header></Header>
            <ul>

            </ul>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" primary>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  let bonuses = state.currentRace.data.ability_bonuses
  let extras = 0

  if (state.currentRace.data.name === "Tiefling") {
    bonuses.reverse()
  }

  if (state.currentRace.data.name === "Half-Elf") {
    extras += 2
  }

  return {
    bonuses,
    extras
  }
}

export default connect(mapStateToProps)(RollStats)
