import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button } from 'semantic-ui-react'

class SelectLanguages extends Component {

  state = {
    standard: [...this.props.standard],
    languages: []
  }

  handleCheckbox = (e, num) => {
    const lang = e.target.value

    //checks to see if it is already selected
    if(this.state.languages.includes(lang)){
      const filteredLangs = this.state.languages.filter(language => language !== lang)
      this.setState({ languages: filteredLangs })

    //check to see if max number of languages have been selected
    } else if (this.state.languages.length < num) {
      this.setState(prevState => {
        return {
          languages: [...prevState.languages, lang]
        }
      })
    } else {
      this.setState(prevState => {
        prevState.languages.pop()
        return {
          languages: [...prevState.languages, lang]
        }
      })
    }
  }

  handleSave = (e) => {
    this.props.setLanguages([...this.state.languages, ...this.state.standard])
    e.target.textContent = "Saved!"
  }

  mappedLanguages = () => {
    const { choose } = this.props.options
    const { languages } = this.state

    return this.props.options.from.map(lang => {
      return (
        <li key={lang.name}>
          <input
            type="checkbox"
            value={lang.name}
            onChange={(e) => this.handleCheckbox(e, choose)}
            checked={languages.includes(lang.name) ? true : false}
          />
          <label>{lang.name}</label>
        </li>)
    })
  }

  render() {
    const { options } = this.props

    return (
      <Modal trigger={<Button type="button">Choose your languages</Button>}  closeIcon>
        <Modal.Header>Languages</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>Choose {options.choose} from</Header>
            <ul>
              {this.mappedLanguages()}
            </ul>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" primary onClick={this.handleSave}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  let standard
  let options

  if (state.currentRace.data.name === "Half-Elf") {
    standard = ["Common", "Elvish"]
    options = {
      choose: 1,
      from: [
        {
          name: "Dwarvish",
			    url: "http://www.dnd5eapi.co/api/languages/2"
        }, {
          name: "Giant",
    			url: "http://www.dnd5eapi.co/api/languages/4"
        }, {
    			name: "Gnomish",
    			url: "http://www.dnd5eapi.co/api/languages/5"
    		}, {
    			name: "Goblin",
    			url: "http://www.dnd5eapi.co/api/languages/6"
    		}, {
    			name: "Halfling",
    			url: "http://www.dnd5eapi.co/api/languages/7"
    		}, {
    			name: "Orc",
    			url: "http://www.dnd5eapi.co/api/languages/8"
    		}, {
    			name: "Abyssal",
    			url: "http://www.dnd5eapi.co/api/languages/9"
    		}, {
    			name: "Celestial",
    			url: "http://www.dnd5eapi.co/api/languages/10"
    		}, {
    			name: "Draconic",
    			url: "http://www.dnd5eapi.co/api/languages/11"
    		}, {
    			name: "Deep Speech",
    			url: "http://www.dnd5eapi.co/api/languages/12"
    		}, {
    			name: "Infernal",
    			url: "http://www.dnd5eapi.co/api/languages/13"
    		}, {
    			name: "Primordial",
    			url: "http://www.dnd5eapi.co/api/languages/14"
    		}, {
    			name: "Sylvan",
    			url: "http://www.dnd5eapi.co/api/languages/15"
    		}, {
    			name: "Undercommon",
    			url: "http://www.dnd5eapi.co/api/languages/16"
    		}
      ]
    }
  } else {
    standard = state.currentRace.data.languages.map(lang => lang.name)
    options = state.currentRace.data.language_options
  }

  return {
    standard,
    options
  }
}

export default connect(mapStateToProps)(SelectLanguages)
