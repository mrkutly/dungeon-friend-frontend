import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button, Grid, Table } from 'semantic-ui-react'
import { Dice } from '../../Dice'

class RollStats extends Component {

  state = {
    charisma: this.props.bonuses[5],
    constitution: this.props.bonuses[2],
    dexterity: this.props.bonuses[1],
    draggingExtra: false,
    draggingIndex: null,
    draggingRoll: null,
    extras: (this.props.extras ? [1, 1] : null),
    intelligence: this.props.bonuses[3],
    rolls: [],
    strength: this.props.bonuses[0],
    usedAbilities: [],
    usedExtras: ["charisma"],
    usedRolls: [],
    wisdom: this.props.bonuses[4],
  }

  extras = () => {
    let i = 0
    return (
      <div>
        <Header>{"Assign to two separate abilities:"}</Header>
        <ul>
          {
            this.state.extras.map(num => {
              i++
              return (
                <li
                  key={`extra ${i}`}
                  className="draggable"
                  draggable
                  onDragStart={(e) => this.handleExtrasDragStart(e)}
                  >
                    {num}
                  </li>
                )
              })
            }
          </ul>
        </div>
      )
    }

  handleDragStart = (e, roll, i) => {
    this.setState({ draggingRoll: roll, draggingIndex: i })
  }

  handleExtrasDragStart = (e) => {
    this.setState({ draggingExtra: true })
  }

  handleDrop = (e, ability) => {
    e.preventDefault()
    if (this.state.usedAbilities.includes(ability) && !this.state.draggingExtra) return
    if (this.state.usedExtras.includes(ability) && this.state.draggingExtra) return

    if (!this.state.draggingExtra) {
      this.setState((prevState) => {
        return {
          [ability]: parseInt(prevState.draggingRoll, 10) + parseInt(prevState[ability], 10),
          draggingRoll: null,
          rolls: prevState.rolls,
          usedAbilities: [...prevState.usedAbilities, ability],
          usedRolls: [...prevState.usedRolls, prevState.rolls.splice(prevState.draggingIndex, 1)],
        }
      })
    } else {
      this.setState((prevState) => {
        prevState.extras.splice(0, 1)
        return {
          [ability]: parseInt(prevState[ability], 10) + 1,
          draggingExtra: false,
          extras: prevState.extras,
          usedExtras: [...prevState.usedExtras, ability],
        }
      })
    }
  }

  handleReset = (e) => {
    this.setState((prevState) => {
      return {
        charisma: this.props.bonuses[5],
        constitution: this.props.bonuses[2],
        dexterity: this.props.bonuses[1],
        draggingExtra: false,
        draggingIndex: null,
        draggingRoll: null,
        extras: (this.props.extras ? [1, 1] : null),
        intelligence: this.props.bonuses[3],
        rolls: [...prevState.rolls, ...prevState.usedRolls],
        strength: this.props.bonuses[0],
        usedExtras: ["charisma"],
        usedRolls: [],
        usedAbilities: [],
        wisdom: this.props.bonuses[4],
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

  rollStats = (e) => {
    this.setState({
      charisma: this.props.bonuses[5],
      constitution: this.props.bonuses[2],
      draggingIndex: null,
      draggingRoll: null,
      dexterity: this.props.bonuses[1],
      extras: (this.props.extras ? [1, 1] : null),
      intelligence: this.props.bonuses[3],
      rolls: [...Dice.rollStats()],
      strength: this.props.bonuses[0],
      usedAbilities: [],
      usedExtras: ["charisma"],
      usedRolls: [],
      wisdom: this.props.bonuses[4],
    })
    e.target.textContent = "Re-roll"
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

                <Grid.Column width={(!!this.props.extras ? 4 : 5)}>
                  <Header>Your rolls:</Header>
                  <ul>
                    {this.mappedRolls()}
                  </ul>
                </Grid.Column>
                <Grid.Column width={(!!this.props.extras ? 3 : 5)}>
                  {
                    !!this.props.extras ?
                    <Grid.Column width={3}>
                      {this.extras()}
                    </Grid.Column>
                    : null
                  }
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
  let extras = false

  // Comment this out if they accept my pr.
  if (state.currentRace.data.name === "Tiefling") {
    bonuses.reverse()
  }

  if (state.currentRace.data.name === "Half-Elf") {
    extras = true
  }

  return {
    bonuses,
    extras
  }
}

export default connect(mapStateToProps)(RollStats)
