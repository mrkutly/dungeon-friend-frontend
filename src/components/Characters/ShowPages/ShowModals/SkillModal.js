import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import Adapter from '../../../../Adapter'

export default class SkillModal extends Component {

  state = {
    data: {}
  }

  componentDidMount() {
    const { url } = this.props.skill
    Adapter.getData(url).then(data => this.setState({ data }))
  }

  renderAbilityScore = (ability) => {
    const { name } = this.state.data

    if (name === "Acrobatics") {
      return "Dexterity"
    }

    switch (ability) {
      case 'STR':
        return "Strength";

      case 'CON':
        return "Constitution";

      case 'DEX':
        return "Dexterity";

      case 'WIS':
        return "Wisdom";

      case 'INT':
        return "Intelligence";

      case 'CHA':
        return "Charisma";

      default:
        return "None";
    }
  }

  render() {
    const { skill } = this.props
    const { data } = this.state

    return (
      <Modal trigger={<a className="modal-trigger">See info</a>}>
        <Modal.Header>{skill.name}</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            { data.ability_score ? <p>Relevant ability score - {this.renderAbilityScore(data.ability_score.name)}</p> : null }
            { data.desc ? <p>{data.desc[0]}</p> : null }
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
