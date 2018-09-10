import React, { Component } from 'react'
import { connect } from 'react-redux'
import Equipment from './ShowPages/Equipment'
import Proficiencies from './ShowPages/Proficiencies'
import Skills from './ShowPages/Skills'
import Spells from './ShowPages/Spells'
import Languages from './ShowPages/Languages'
import SearchBar from './SearchBar'
import { NavLink } from 'react-router-dom'
import Adapter from '../../Adapter'
import { Grid, Menu, Button } from 'semantic-ui-react'
import { updateCharacter, setCurrentPage } from '../../redux/actions'


class CharacterEdit extends Component {

  state = {}

  componentWillMount() {
    this.props.setCurrentPage("characters")
  }

  // Uncomment this function and remove save butto to implement auto-saving
  
  // componentWillUnmount() {
  //   Adapter.updateCharacter(this.props.character).then(({ character }) => {
  //     this.props.updateCharacter(character)
  //   })
  // }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleSave = (e) => {
    e.persist()
    Adapter.updateCharacter(this.props.character).then(({ character }) => {
      e.target.textContent = "Saved!"
      this.props.updateCharacter(character)
    })
  }

  increase = (score) => {
    const { character } = this.props
    character[score] += 1
    this.props.updateCharacter(character)
    this.setState(this.state)
  }

  decrease = (score) => {
    const { character } = this.props
    character[score] -= 1
    this.props.updateCharacter(character)
    this.setState(this.state)
  }

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

  mappedScores = (scores) => {
    const { character } = this.props
    return scores.map(score => {
      let arr = score.split("")
      const title = arr.shift().toUpperCase() + arr.join("")
      const formatted = (window.innerWidth < 1004 ? title.slice(0, 3).toUpperCase() : title)

      return (
        <Grid.Row key={score}>
          <Grid.Column width={6}>
            <h4>{formatted}</h4>
          </Grid.Column>
          <Grid.Column width={4}>
            <h4>{character[score]}</h4>
          </Grid.Column>
          <Grid.Column width={6}>
            <Button type="button" onClick={() => this.decrease(score)} icon="minus"></Button>
            <Button type="button" onClick={() => this.increase(score)} icon="add"></Button>
          </Grid.Column>
        </Grid.Row>
      )
    })
  }

  render() {
    const { character } = this.props
    const { activeItem } = this.state
    const fullHp = character.current_hp >= character.max_hp

    return (
      <React.Fragment>
        <h1 className="center">Edit Character Sheet</h1>
        <Grid celled>
          <Grid.Row>

            <Grid.Column width={12}>
              <NavLink to={`/characters/${character.id}`}>Back</NavLink>
            </Grid.Column>

            <Grid.Column width={4}>
              <Button basic color="blue" type="button" onClick={this.handleSave} >Save</Button>
            </Grid.Column>

          </Grid.Row>
          <Grid.Row>

            <Grid.Column width={8}>
              <h1>{character.name}</h1>
              <p>Lvl {character.level} {character.race.name} {character.job.name}</p>
              <Button basic color="blue" type="button" onClick={() => this.increase("level")}>Lvl Up</Button>
            </Grid.Column>

            <Grid.Column width={8}>
              <h3>HP {character.current_hp} / {character.max_hp}</h3>

              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>

                    <p>Current</p>
                    <Button.Group basic>
                      <Button type="button" onClick={() => this.decrease("current_hp")} icon="minus" />
                      <Button type="button" onClick={() => this.increase("current_hp")} icon="plus" disabled={fullHp} />
                    </Button.Group>

                  </Grid.Column>
                  <Grid.Column width={8}>

                    <p>Max</p>
                    <Button.Group basic>
                      <Button type="button" onClick={() => this.decrease("max_hp")} icon="minus" />
                      <Button type="button" onClick={() => this.increase("max_hp")} icon="plus" />
                    </Button.Group>

                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>

          </Grid.Row>
          <Grid.Row>

            <Grid.Column width={16}>
              <Menu>
                {this.mappedMenuItems(['equipment', 'proficiencies', 'skills', 'spells', 'languages'])}

                {
                  activeItem ?
                  <Menu.Item position="right">
                    search {activeItem}
                    <SearchBar query={activeItem} character={character} />
                  </Menu.Item>
                  :
                  null
                }
              </Menu>
            </Grid.Column>

          </Grid.Row>
          <Grid.Row>

            <Grid.Column width={5}>
              <Grid celled>
                {this.mappedScores(["strength", "dexterity", "constitution", "wisdom", "intelligence", "charisma"])}
              </Grid>
            </Grid.Column>

            <Grid.Column width={8}>
              { activeItem === "equipment" ? <Equipment character={character} edit={true} /> : null }
              { activeItem === "proficiencies" ? <Proficiencies profs={character.proficiencies} /> : null }
              { activeItem === "skills" ? <Skills skills={character.skills} /> : null }
              { activeItem === "spells" ? <Spells spells={character.spells} /> : null }
              { activeItem === "languages" ? <Languages langs={character.languages} /> : null }
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


const mapDispatchToProps = (dispatch) => {
  return {
    updateCharacter: (character) => dispatch( updateCharacter(character) ),
    setCurrentPage: (page) => dispatch( setCurrentPage(page) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterEdit)
