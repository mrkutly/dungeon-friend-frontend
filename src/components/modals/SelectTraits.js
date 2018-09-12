import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button } from 'semantic-ui-react'

class SelectTraits extends Component {

  state = {
    standard: [...this.props.standard],
    traits: []
  }

  handleCheckbox = (e, num) => {
    const chosenTrait = e.target.value

    //checks to see if it is already selected
    if(this.state.traits.includes(chosenTrait)){
      const filteredTraits = this.state.traits.filter(trait => trait !== chosenTrait)
      this.setState({ traits: filteredTraits })

    //check to see if max number of traits have been selected
  } else if (this.state.traits.length < num) {
      this.setState(prevState => {
        return {
          traits: [...prevState.traits, chosenTrait]
        }
      })
    } else {
      this.setState(prevState => {
        prevState.traits.pop()
        return {
          traits: [...prevState.traits, chosenTrait]
        }
      })
    }
  }

  handleSave = (e) => {
    this.props.setTraits([...this.state.traits, ...this.state.standard])
    e.target.textContent = "Saved!"
  }

  mappedTraits = () => {
    const { choose } = this.props.options
    const { traits } = this.state

    return this.props.options.from.map(trait => {
      return (
        <li key={trait.name}>
          <input
            type="checkbox"
            value={trait.name}
            onChange={(e) => this.handleCheckbox(e, choose)}
            checked={traits.includes(trait.name) ? true : false}
          />
          <label> {trait.name}</label>
        </li>)
      }
    )
  }



  render() {
    return (
      <Modal trigger={<Button basic color="black" type="button">Choose your traits</Button>} closeIcon>
        <Modal.Header>Traits</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>Choose {this.props.options.choose} from</Header>
            <ul>
              {this.mappedTraits()}
            </ul>

          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="black" type="button" onClick={this.handleSave}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  const standard = state.currentRace.data.traits.map(trait => trait.name)
  return {
    standard,
    options: state.currentRace.data.trait_options
  }
}

export default connect(mapStateToProps)(SelectTraits)
