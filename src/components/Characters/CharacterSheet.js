import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Grid, Menu, Divider } from 'semantic-ui-react'
import Equipment from './ShowPages/Equipment'
import Features from './ShowPages/Features'
import Languages from './ShowPages/Languages'
import Proficiencies from './ShowPages/Proficiencies'
import Skills from './ShowPages/Skills'
import Spells from './ShowPages/Spells'
import { setCurrentPage } from '../../redux/actions'


class CharacterSheet extends Component {
  state = {}

  componentWillMount() {
    this.props.setCurrentPage("characters")
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  mappedMenuItems = (items) => {
    const { activeItem } = this.state
    return items.map(item => {
      return (
        <Menu.Item
          key={item}
          name={item}
          active={activeItem === {item}}
          onClick={this.handleItemClick}
        />
      )
    })
  }

  mappedH4s = (h4s) => {
    let i = 0
    return h4s.map(h4 => {
      const formatted = (window.innerWidth < 1004 && typeof h4 === "string" ? h4.slice(0, 3).toUpperCase() : h4)
      if (i === 5) {
        return (
          <React.Fragment key={`${h4} ${Math.random()} ${i}`}>
            <h4>{formatted}</h4>
          </React.Fragment>
        )
      } else {
        i++
        return (
          <React.Fragment key={`${h4} ${Math.random()} ${i}`}>
            <h4>{formatted}</h4>
            <Divider />
          </React.Fragment>
        )
      }
    })
  }

  render() {
    const { character } = this.props
    const { activeItem } = this.state

    if (!character) {
      return <div className="center large-header">Character not found</div>
    } else {
      const stats = ["Strength", "Dexterity", "Constitution", "Wisdom", "Intelligence", "Charisma"]
      const characterStats = [character.strength, character.dexterity, character.constitution, character.wisdom, character.intelligence, character.charisma]

      return (
        <React.Fragment>
          <div className="medium-header">Character Sheet</div>
          <br />
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
                <h3>Speed {character.speed}</h3>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16}>
                <Menu>
                  {this.mappedMenuItems(['equipment', 'proficiencies', 'skills', 'spells', 'languages', 'features'])}
                </Menu>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={2}>
                {this.mappedH4s(stats)}
              </Grid.Column>
              <Grid.Column width={1}>
                {this.mappedH4s(characterStats)}
              </Grid.Column>
              <Grid.Column width={13} className="show-page">
                { activeItem === "equipment" ? <Equipment character={character} edit={false} /> : null }
                { activeItem === "proficiencies" ? <Proficiencies profs={character.proficiencies} /> : null }
                { activeItem === "skills" ? <Skills skills={character.skills} /> : null }
                { activeItem === "spells" ? <Spells spells={character.spells} /> : null }
                { activeItem === "languages" ? <Languages langs={character.languages} /> : null }
                { activeItem === "features" ? <Features features={character.features} /> : null }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = (state, _props) => {
  const id = parseInt(_props.match.params.id, 10)
  const character = state.characters.find(char => { return char.id === id })
  return {
    character
  }
}

export default connect(mapStateToProps, { setCurrentPage })(CharacterSheet)
