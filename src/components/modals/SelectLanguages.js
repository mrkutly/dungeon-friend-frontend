import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button } from 'semantic-ui-react'

class SelectLanguages extends Component {

  state = {
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
    }
  }

  handleSave = (e) => {
    this.props.setLanguages(this.state.languages)
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
  return {
    options: state.currentRace.data.language_options
  }
}

export default connect(mapStateToProps)(SelectLanguages)
