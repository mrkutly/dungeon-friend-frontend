import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button, Grid } from 'semantic-ui-react'
import { Dice } from '../../Dice'

class RollStats extends Component {

  state = {
    rolls: [],
  }

  addBonuses = (ability, num) => {
    const { bonuses } = this.props
    switch (ability) {
      case "strength":
        num += bonuses[0];
        break;

      case "dexterity":
        num += bonuses[1];
        break;

      case "constitution":
        num += bonuses[2];
        break;

      case "intelligence":
        num += bonuses[3];
        break;

      case "wisdom":
        num += bonuses[4];
        break;

      case "charisma":
        num += bonuses[5];
        break;

      default:
        break;
    }
    return num
  }

  // name === 'Half-Elf' ? Two other Ability Scores of your choice increase by 1

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
          score[ability] = this.addBonuses(ability, roll.num)
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

  mappedAbilities = (abilities) => {
    return abilities.map(ability => {
      return (
        <Grid.Column width={4} key={ability}>
          <Header>{ability}</Header>
          <ul>
            {this.mappedRolls(ability.toLowerCase())}
          </ul>
        </Grid.Column>
      )
    })
  }

  mappedBonuses = () => {
    const { bonuses } = this.props
    return (
      <p>
        {"Your Bonuses:  "}
        {bonuses[0] > 0 ? ` |  +${bonuses[0]} Strength  | ` : null }
        {bonuses[1] > 0 ? ` |  +${bonuses[1]} Dexterity  | ` : null }
        {bonuses[2] > 0 ? ` |  +${bonuses[2]} Constitution  | ` : null }
        {bonuses[3] > 0 ? ` |  +${bonuses[3]} Intelligence  | ` : null }
        {bonuses[4] > 0 ? ` |  +${bonuses[4]} Wisdom  | ` : null }
        {bonuses[5] > 0 ? ` |  +${bonuses[5]} Charisma  | ` : null }
      </p>
    )
  }

  mappedRolls = (ability) => {
    let i = 0
    return this.state.rolls.map(roll => {
      i++
      let num = this.addBonuses(ability, roll.num)

      return (
        <li key={`${ability} - ${num} - ${i}`}>
          <input
            type="checkbox"
            value={`${ability} - ${roll.num} - ${i}`}
            onChange={this.handleCheckbox}
            checked={roll[ability]}
          />
          <label>{num}</label>
        </li>
      )
    })
  }

  rollStats = (e) => {
    this.setState({ rolls: [...Dice.rollStats()] })
    e.target.textContent = "Re-roll"
  }

  showRolls = () => {
    const rolls = this.state.rolls.map(roll => roll.num).join(" - ")
    return <p>{rolls}</p>
  }

  render() {
    return (
      <Modal trigger={<Button basic color="black" type="button">Roll for stats</Button>}  closeIcon>
        <Modal.Header>Stats</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>You rolled - {this.showRolls()}</Header>
            {this.mappedBonuses()}

            <Grid>
              <Grid.Row>
                {this.mappedAbilities(["Strength", "Dexterity", "Constitution"])}
              </Grid.Row>
              <Grid.Row>
                {this.mappedAbilities(["Intelligence", "Wisdom", "Charisma"])}
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="black" type="button" onClick={this.rollStats}>
            Roll the dice
          </Button>
          <Button basic color="black" type="button" onClick={this.handleSave}>
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
