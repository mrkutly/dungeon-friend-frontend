import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

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
    <div className="display">

      <div>
        <h1>{name}</h1>
        <h2>Hit Die: {hit_die}</h2>
      </div>

      <div>
        <h2>Starting Proficiencies</h2>
        <ul>
          {mappedProficiencies}
        </ul>
      </div>

      <div>
        <h2>Profiency Choices</h2>
        {mappedProfiencyChoices}
      </div>

      <div>
        <h2>Saving Throws</h2>
        <ul>
          {mappedSavingThrows}
        </ul>
      </div>

      {
        subclasses.length > 0 ?
        <div>
          <h2>Subclasses</h2>
          <ul>
            {subclasses.map(sub => <li key={sub.name}>{sub.name}</li>)}
          </ul>
        </div> :
        null
      }

      {
        spellcasting ?
        <div>
          <h2>Spellcasting</h2>
          <p>Relevant ability score - {spellcasting.spellcasting_ability.name}</p>
          {mappedSpellcasting()}
        </div> :
        null
      }

      <button onClick={() => props.back()}> Show all classes </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    race: state.currentRace,
    job: state.currentJob
  }
}


export default connect(mapStateToProps)(JobDisplay)
