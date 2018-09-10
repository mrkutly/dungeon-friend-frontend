import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button, Grid, Table } from 'semantic-ui-react'
import { Dice } from '../../Dice'

class RollStats extends Component {

  state = {
    rolls: [],
    usedRolls: [],
    usedAbilities: [],
    strength: this.props.bonuses[0],
    dexterity: this.props.bonuses[1],
    constitution: this.props.bonuses[2],
    intelligence: this.props.bonuses[3],
    wisdom: this.props.bonuses[4],
    charisma: this.props.bonuses[5],
    draggingRoll: null,
    draggingIndex: null,
  }

  handleDragStart = (e, roll, i) => {
    this.setState({ draggingRoll: roll, draggingIndex: i })
  }

  handleDrop = (e, ability) => {
    e.preventDefault()
    if (this.state.usedAbilities.includes(ability)) return

    this.setState((prevState) => {
      return {
        [ability]: parseInt(prevState.draggingRoll) + parseInt(prevState[ability]),
        draggingRoll: null,
        rolls: prevState.rolls,
        usedRolls: [...prevState.usedRolls, prevState.rolls.splice(prevState.draggingIndex, 1)],
        usedAbilities: [...prevState.usedAbilities, ability],
      }
    })
  }

  handleReset = (e) => {
    this.setState((prevState) => {
      return {
        rolls: [...prevState.rolls, ...prevState.usedRolls],
        usedRolls: [],
        usedAbilities: [],
        strength: this.props.bonuses[0],
        dexterity: this.props.bonuses[1],
        constitution: this.props.bonuses[2],
        intelligence: this.props.bonuses[3],
        wisdom: this.props.bonuses[4],
        charisma: this.props.bonuses[5],
        draggingRoll: null,
        draggingIndex: null
      }
    })
  }

  handleSave = (e) => {
    const { strength, dexterity, constitution, intelligence, wisdom, charisma } = this.state
    let scores = {
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma
    }

    this.props.setAbilityScores(scores)
    e.target.textContent = "Saved!"
  }

  mappedAbilities = (abilities) => {
    return abilities.map(ability => {
      let lAb = ability.toLowerCase()
      return (
        <Table.Row key={`${ability} row`}>
          <Table.Cell>
            {ability}
          </Table.Cell>
          <Table.Cell
            onDrop={(e) => this.handleDrop(e, lAb)}
            onDragOver={(e) => e.preventDefault()}
          >
            {this.state[lAb]}
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  mappedBonuses = () => {
    const { bonuses } = this.props
    return (
      <div>
        <Header>{"Your Bonuses:  "}</Header>
        <ul>
          {bonuses[0] > 0 ? <li> +{bonuses[0]} Strength </li> : null }
          {bonuses[1] > 0 ? <li> +{bonuses[1]} Dexterity </li> : null }
          {bonuses[2] > 0 ? <li> +{bonuses[2]} Constitution </li> : null }
          {bonuses[3] > 0 ? <li> +{bonuses[3]} Intelligence </li> : null }
          {bonuses[4] > 0 ? <li> +{bonuses[4]} Wisdom </li> : null }
          {bonuses[5] > 0 ? <li> +{bonuses[5]} Charisma </li> : null }
        </ul>
      </div>
    )
  }

  rollStats = (e) => {
    this.setState({
      rolls: [...Dice.rollStats()],
      usedRolls: [],
      usedAbilities: [],
      strength: this.props.bonuses[0],
      dexterity: this.props.bonuses[1],
      constitution: this.props.bonuses[2],
      intelligence: this.props.bonuses[3],
      wisdom: this.props.bonuses[4],
      charisma: this.props.bonuses[5],
      draggingRoll: null,
      draggingIndex: null
     })
    e.target.textContent = "Re-roll"
  }

  mappedRolls = () => {
    let i = 0
    return this.state.rolls.map(roll => {
      i++
      let index = i - 1
      return (
        <li
          className="draggable"
          draggable
          key={`${roll} ${i}`}
          onDragStart={(e) => this.handleDragStart(e, roll, index)}
        >
          {roll}
        </li>
      )
    })
  }

  render() {
    return (
      <Modal trigger={<Button basic color="black" type="button">Roll for stats</Button>}  closeIcon>
        <Modal.Header>Stats</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>Click the button to roll the dice, then drag and drop your rolls onto the table.</Header>
            <Grid>
              <Grid.Row>

                <Grid.Column width={6}>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Ability</Table.HeaderCell>
                        <Table.HeaderCell>Scores</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.mappedAbilities(["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"])}
                    </Table.Body>
                  </Table>
                </Grid.Column>

                <Grid.Column width={5}>
                  <Header>Your rolls:</Header>
                  <ul>
                    {this.mappedRolls()}
                  </ul>
                </Grid.Column>
                <Grid.Column width={5}>
                  {this.mappedBonuses()}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="black" type="button" onClick={this.rollStats}>
            Roll the dice
          </Button>
          <Button basic color="black" type="button" onClick={this.handleReset}>
            Reset
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

  // Comment this out if they accept my pr.
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
