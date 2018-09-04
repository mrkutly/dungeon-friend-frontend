import React, { Component } from 'react'
import { connect } from 'react-redux'
import Equipment from './ShowPages/Equipment'
import Proficiencies from './ShowPages/Proficiencies'
import Skills from './ShowPages/Skills'
import { NavLink } from 'react-router-dom'
// import { Dice } from '../../Dice'
// import { Adapter } from '../../Adapter'
import { Grid, Menu, Divider } from 'semantic-ui-react'


class CharacterSheet extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { character } = this.props
    const { activeItem } = this.state

    return (
      <React.Fragment>
        <h1 className="center">Character Sheet</h1>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={12}>
              <NavLink to="/characters">Back</NavLink>
            </Grid.Column>
            <Grid.Column width={4}>
              <NavLink to={`/characters/${character.id}/edit`}>Edit</NavLink>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              <h1>{character.name}</h1>
              <p>Lvl {character.level} {character.race.name} {character.job.name}</p>
            </Grid.Column>
            <Grid.Column width={6}>
              <h3>HP {character.current_hp} / {character.max_hp}</h3>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Menu>
                <Menu.Item
                  name='equipment'
                  active={activeItem === 'equipment'}
                  onClick={this.handleItemClick}
                >
                  Equipment
                </Menu.Item>

                <Menu.Item
                  name='proficiencies'
                  active={activeItem === 'proficiencies'}
                  onClick={this.handleItemClick}
                >
                  Proficiencies
                </Menu.Item>

                <Menu.Item
                  name='skills'
                  active={activeItem === 'skills'}
                  onClick={this.handleItemClick}
                >
                  Skills
                </Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={2}>
                <h4>Strength</h4>
                <Divider />
                <h4>Dexterity</h4>
                <Divider />
                <h4>Constitution</h4>
                <Divider />
                <h4>Wisdom</h4>
                <Divider />
                <h4>Intelligence</h4>
                <Divider />
                <h4>Charisma</h4>
            </Grid.Column>
            <Grid.Column width={1}>
                <h4>{character.strength}</h4>
                <Divider />
                <h4>{character.dexterity}</h4>
                <Divider />
                <h4>{character.constitution}</h4>
                <Divider />
                <h4>{character.wisdom}</h4>
                <Divider />
                <h4>{character.intelligence}</h4>
                <Divider />
                <h4>{character.charisma}</h4>
            </Grid.Column>
            <Grid.Column width={13}>
              { activeItem === "equipment" ? <Equipment equipment={character.equipment} /> : null }
              { activeItem === "proficiencies" ? <Proficiencies profs={character.proficiencies} /> : null }
              { activeItem === "skills" ? <Skills skills={character.skills} /> : null }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, _props) => {
  const id = parseInt(_props.match.params.id, 10)
  const character = state.characters.find(char => { return char.id === id })
  return {
    character
  }
}

export default connect(mapStateToProps)(CharacterSheet)
