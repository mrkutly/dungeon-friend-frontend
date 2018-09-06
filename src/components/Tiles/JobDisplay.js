import React from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Divider } from 'semantic-ui-react'

const JobDisplay = (props) => {

  const { name,
    hit_die,
    proficiencies,
    proficiency_choices,
    saving_throws, subclasses, spellcasting } = props.job.data

  const mappedProficiencies = proficiencies.map(prof => <li key={prof.url}>{prof.name}</li>)

  const mappedProfiencyChoices = proficiency_choices.map(prof => {
      return (
        <div key={prof.from[0].name}>
          <p>Choose {prof.choose} from</p>
          <ul>
            {prof.from.map(choice => (
              <li key={choice.url}>
                {choice.name}
              </li>))}
          </ul>
        </div>
      )
    }
  )

  const mappedSavingThrows = saving_throws.map(save => {
    switch(save.name){
      case 'DEX':
      return <li key="dexterity">Dexterity</li>;

      case 'CHA':
      return <li key="charisma">Charisma</li>;

      case 'STR':
      return <li key="strength">Strength</li>;

      case 'CON':
      return <li key="constitution">Constitution</li>;

      case 'WIS':
      return <li key="wisdom">Wisdom</li>;

      case 'INT':
      return <li key="intelligence">Intelligence</li>;

      default:
      return null;
    }
  })

  const mappedSpellcasting = () => {
    return spellcasting.info.map(obj => {
      return (
        <div key={obj.name}>
          <p>{obj.name}</p>
          <ul>
            {obj.desc.map(point => <li key={point}>{point}</li>)}
          </ul>
        </div>
      )
    })
  }

  return (
    <React.Fragment>
      <Button basic color="black" type="button" onClick={() => props.back()}> Show all classes </Button>
      <br />
      <br />
      <Divider />
      <Grid columns={4} divided stackable>
        <Grid.Row>
          <Grid.Column>
            <div className="medium-header">{name}</div>
            <div className="small-header">Hit Die: {hit_die}</div>

            <div className="small-header">Saving Throws</div>
            <ul>
              {mappedSavingThrows}
            </ul>
          </Grid.Column>

          <Grid.Column>
            <div className="small-header">Profiency Choices</div>
            {mappedProfiencyChoices}
          </Grid.Column>

          <Grid.Column>
            <div className="small-header">Starting Proficiencies</div>
            <ul>
              {mappedProficiencies}
            </ul>
          </Grid.Column>
          {
            subclasses.length > 0 ?
            <Grid.Column>
              <div className="small-header">Subclasses</div>
              <ul>
                {subclasses.map(sub => <li key={sub.name}>{sub.name}</li>)}
              </ul>
            </Grid.Column> :
            null
          }
        </Grid.Row>

        {
          spellcasting ?
          <div>
            <div className="small-header">Spellcasting</div>
            <p>Relevant ability score - {spellcasting.spellcasting_ability.name}</p>
            {mappedSpellcasting()}
          </div> :
          null
        }
      </Grid>
      <Divider />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    race: state.currentRace,
    job: state.currentJob
  }
}


export default connect(mapStateToProps)(JobDisplay)
