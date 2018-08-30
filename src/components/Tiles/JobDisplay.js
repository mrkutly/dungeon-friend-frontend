import React, { Component } from 'react'

class JobDisplay extends Component {

  state = {
    selectedProficiencies: [],
    secondProficiencies: []
  }

  handleCheckboxChange(e, num, proficiencyList) {

    // Checks to see if already selected. If it is, unselect it
    if (this.state[proficiencyList].includes(e.target.value)) {
      const filteredProfs = this.state[proficiencyList].filter(prof => prof !== e.target.value)
      this.setState({ [proficiencyList]: filteredProfs })

    // Checks to see how many have been selected
  } else if (this.state[proficiencyList].length < num) {
      const prof = e.target.value
      this.setState(prevState => {
        return {
          [proficiencyList]: [...prevState[proficiencyList], prof]
        }
      })
    }
  }

  mappedProficiencies = (proficiencies) => proficiencies.map(prof => <li key={prof.url}>{prof.name}</li>)

  mappedProfiencyChoices = (proficiencyChoices) => {
    let i = 0

    return proficiencyChoices.map(prof => {
      // Chooses which array in state to compare selected proficiencies to
      let proficiencyList = (i === 0 ? "selectedProficiencies" : "secondProficiencies")
      ++i

      return (
        <div key={prof.from[0].name}>
          <p>Choose {prof.choose} from</p>
          <ul>
            {prof.from.map(choice => (
              <li key={choice.url}>

                <input type="checkbox"
                  value={choice.name}
                  onChange={(e) => this.handleCheckboxChange(e, prof.choose, proficiencyList)}
                  checked={(this.state[proficiencyList].includes(choice.name) ? true : false)}
                />

                <label>{choice.name}</label>
              </li>))}
          </ul>
        </div>
      )
    })
  }

  mappedSavingThrows = (savingThrows) => {
    return savingThrows.map(save => {
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
  }

  render() {
    console.log(this.state)
    const { name,
            hit_die,
            proficiencies,
            proficiency_choices,
            saving_throws, subclasses } = this.props.job.data

    return (
      <div className="display">
        <div>
          <h1>{name}</h1>
          <h2>Hit Die: {hit_die}</h2>
        </div>

        <div>
          <h2>Starting Proficiencies</h2>
          <ul>
            {this.mappedProficiencies(proficiencies)}
          </ul>
        </div>

        <div>
          <h2>Profiency Choices</h2>
          {this.mappedProfiencyChoices(proficiency_choices)}
        </div>

        <div>
          <h2>Saving Throws</h2>
          <ul>
            {this.mappedSavingThrows(saving_throws)}
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

        <button onClick={() => this.props.back()}> Show all classes </button>
      </div>
    )
  }
}

export default JobDisplay
