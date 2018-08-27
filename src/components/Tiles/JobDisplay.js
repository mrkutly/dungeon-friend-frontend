import React from 'react'

const JobDisplay = (props) => {
  console.log(props)
  const { name,
          hit_die,
          proficiencies,
          proficiency_choices,
          saving_throws, subclasses } = props.job.data

  const mappedProficiencies = proficiencies.map(prof => <li key={prof.name}>{prof.name}</li>)

  const mappedProfiencyChoices = proficiency_choices.map(prof => {
    return (
      <div key={prof.from[0].name}>
        <p>Choose {prof.choose} from</p>
        <ul>
          {prof.from.map(choice => <li key={choice.url}>{choice.name}</li>)}
        </ul>
      </div>
    )
  })

  const mappedSavingThrows = saving_throws.map(save => {
    switch(save.name){
      case 'DEX':
        return <li>Dexterity</li>;

      case 'CHA':
        return <li>Charisma</li>;

      case 'STR':
        return <li>Strength</li>;

      case 'CON':
        return <li>Constitution</li>;

      case 'WIS':
        return <li>Wisdom</li>;

      case 'INT':
        return <li>Intelligence</li>;

      default:
        return null;
    }
  })


  return (
    <div className="display">
      <div className="job-display-left">
        <h1>{name}</h1>
        <h2>Hit Die: {hit_die}</h2>
      </div>

      <div className="job-display-left">
        <h2>Starting Proficiencies</h2>
        <ul>
          {mappedProficiencies}
        </ul>
      </div>

      <div className="job-display-left">
        <h2>Profiency Choices</h2>
        {mappedProfiencyChoices}
      </div>

      <div className="job-display-left">
        <h2>Saving Throws</h2>
        <ul>
          {mappedSavingThrows}
        </ul>
      </div>

      <button className="show-all-jobs-btn" onClick={() => props.back()}> Show all classes </button>
    </div>
  )
}

export default JobDisplay
