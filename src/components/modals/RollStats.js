import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button, Grid } from 'semantic-ui-react'
import { Dice } from '../../Dice'

class RollStats extends Component {

  state = {
    rolls: [...Dice.rollStats()],
  }

  handleCheckbox = (e) => {
    const splitValue = e.target.value.split(" - ")
    const ability = splitValue[0]
    const num = parseInt(splitValue[1], 10)
    const i = parseInt(splitValue[2], 10) - 1
    const notChosen = ["charisma", "constitution", "dexterity", "intelligence", "strength", "wisdom"].filter(el => el !== ability)

    this.setState((prevState) => {
      const rolls = prevState.rolls.map(roll => {
        if (roll.num === num && i === prevState.rolls.indexOf(roll)) {
          roll[ability] = true
          notChosen.forEach(ab => roll[ab] = false)
        } else {
          roll[ability] = false
        }
        return roll
      })
      return { rolls }
    })
  }

  handleSave = (e) => {
    const scores = this.state.rolls.map(roll => {
      let score = {}

      Object.keys(roll).forEach(ability => {
        if (roll[ability] === true) {
          score[ability] = roll.num
        }
      })

      if (Object.keys(score).length === 1) {
        return score
      } else {
        return null
      }
    })

    if (scores.some(score => !score)) {
      alert("Make sure you select a roll for each of your ability scores!")
      return
    } else {
      this.props.setAbilityScores(scores)
      e.target.textContent = "Saved!"
    }
  }

  mappedRolls = (ability) => {
    let i = 0
    return this.state.rolls.map(roll => {
      i++
      return (
        <li key={`${ability} - ${roll.num} - ${i}`}>
          <input
            type="checkbox"
            value={`${ability} - ${roll.num} - ${i}`}
            onChange={this.handleCheckbox}
            checked={roll[ability]}
          />
          <label>{roll.num}</label>
        </li>
      )
    })
  }


  // implement these ability_bonuses from currentRace
  // Strength:  ability_bonuses[0]
  // Dexterity: ability_bonuses[1]
  // Constitution: ability_bonuses[2]
  // Intelligence: ability_bonuses[3]
  // Wisdom: ability_bonuses[4]
  // Charisma: ability_bonuses[5]
  // name === 'Half-Elf' ? Two other Ability Scores of your choice increase by 1

  render() {
    return (
      <Modal trigger={<Button type="button">Roll for stats</Button>}  closeIcon>
        <Modal.Header>Stats</Modal.Header>
        <Modal.Content >
          <Modal.Description>

            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Header>Strength</Header>
                  <ul>
                    {this.mappedRolls("strength")}
                  </ul>
                </Grid.Column>


                <Grid.Column width={4}>
                  <Header>Dexterity</Header>
                  <ul>
                    {this.mappedRolls("dexterity")}
                  </ul>
                </Grid.Column>


                <Grid.Column width={4}>
                  <Header>Constitution</Header>
                  <ul>
                    {this.mappedRolls("constitution")}
                  </ul>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Header>Wisdom</Header>
                  <ul>
                    {this.mappedRolls("wisdom")}
                  </ul>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Header>Intelligence</Header>
                  <ul>
                    {this.mappedRolls("intelligence")}
                  </ul>
                </Grid.Column>


                <Grid.Column width={4}>
                  <Header>Charisma</Header>
                  <ul>
                    {this.mappedRolls("charisma")}
                  </ul>
                </Grid.Column>

              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" primary onClick={this.handleSave}>
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
