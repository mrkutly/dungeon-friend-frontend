import React from 'react'

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
    <div className="display">
      <h1>{name}</h1>
      <h2>Speed: {speed}</h2>

      <h2>Ability Score Bonuses</h2>
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

      <h2>Age</h2>
      <p>{age}</p>

      <h2>Alignment</h2>
      <p>{alignment}</p>

      <h2>Languages</h2>
      <p>{language_desc}</p>

      <h2>Size</h2>
      <p>{size_description}</p>

      <h2>Starting Proficiencies</h2>
      <ul>
        {starting_proficiencies.length ? mappedProficiencies : <li>None</li>}
      </ul>

      <h2>Subraces</h2>
      <ul>
        {subraces.length ? mappedSubraces : <li>None</li>}
      </ul>

      <h2>Traits</h2>
      <ul>
        {traits.length ? mappedTraits : <li>None</li>}
      </ul>
      <button onClick={() => props.back()}> Show all races </button>
    </div>
  )
}

export default RaceDisplay
