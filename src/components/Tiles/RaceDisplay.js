import React from 'react'
import { Grid, Button, Divider } from 'semantic-ui-react'

const RaceDisplay = (props) => {

  const { name, speed,
          ability_bonuses,
          starting_proficiencies,
          subraces, traits, alignment,
          age, language_desc, size_description } = props.race.data

  const mappedProficiencies = starting_proficiencies.map(prof => (
    <li key={prof.name}>{prof.name}</li>)
  )

  const mappedSubraces = subraces.map(sub => <li key={sub.name}>{sub.name}</li>)
  const mappedTraits = traits.map(trait => <li key={trait.name}>{trait.name}</li>)

  return (
    <React.Fragment>
      <Button basic color="black" onClick={() => props.back()}> Show all races </Button>
      <br />
      <br />
      <Divider />
      <Grid columns={3} divided stackable>
        <Grid.Row>
          <Grid.Column>
            <div className="medium-header">{name}</div>
            <div className="small-header">Speed: {speed}</div>
          </Grid.Column>

          <Grid.Column>
            <div className="small-header">Ability Score Bonuses</div>
            <ul>
              {/* Tiefling stats are backwards on the API */}
              {/* Remove these ternaries when my pull request gets accepted */}
              <li>Strength: {name === 'Tiefling' ? ability_bonuses[5] : ability_bonuses[0]}</li>
              <li>Dexterity: {name === 'Tiefling' ? ability_bonuses[4] : ability_bonuses[1]}</li>
              <li>Constitution: {name === 'Tiefling' ? ability_bonuses[3] : ability_bonuses[2]}</li>
              <li>Intelligence: {name === 'Tiefling' ? ability_bonuses[2] : ability_bonuses[3]}</li>
              <li>Wisdom: {name === 'Tiefling' ? ability_bonuses[1] : ability_bonuses[4]}</li>
              <li>Charisma: {name === 'Tiefling' ? ability_bonuses[0] : ability_bonuses[5]}</li>
              { name === 'Half-Elf' ? <li>Two other Ability Scores of your choice increase by 1</li> : null }
            </ul>
          </Grid.Column>

          <Grid.Column>
            <div className="small-header">Starting Proficiencies</div>
            <ul>
              {starting_proficiencies.length ? mappedProficiencies : <li>None</li>}
            </ul>
          </Grid.Column>
        </Grid.Row>


        <Grid.Row>
          <div className="small-header">Age</div>
          <p>{age}</p>
        </Grid.Row>
        <Grid.Row>
          <div className="small-header">Alignment</div>
          <p>{alignment}</p>
        </Grid.Row>
        <Grid.Row>
          <div className="small-header">Languages</div>
          <p>{language_desc}</p>
        </Grid.Row>
        <Grid.Row>
          <div className="small-header">Size</div>
          <p>{size_description}</p>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
              <div className="small-header">Subraces</div>
              <ul>
                {subraces.length ? mappedSubraces : <li>None</li>}
              </ul>
          </Grid.Column>

          <Grid.Column>
            <div className="small-header">Traits</div>
            <ul>
              {traits.length ? mappedTraits : <li>None</li>}
            </ul>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
    </React.Fragment>
  )
}

export default RaceDisplay
