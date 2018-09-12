import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import Adapter from '../../../../Adapter'

export default class SkillModal extends Component {

  state = {
    data: {}
  }

  componentDidMount() {
    const { url } = this.props.spell
    Adapter.getData(url).then(data => this.setState({ data }))
  }

  render() {
    const { spell } = this.props
    const { data } = this.state

    return (
      <Modal trigger={<a className="modal-trigger">See info</a>}>
        <Modal.Header>{spell.name}</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            { data.casting_time ? <h4>Casting Time: {data.casting_time}</h4> : null }
            { data.concentration ? <h4>Concentration: {data.concentration}</h4> : null }
            { data.ritual ? <h4>Ritual: {data.ritual}</h4>: null }
            { data.duration ? <h4>Duration: {data.duration}</h4> : null }
            { data.range ? <h4>Range: {data.range}</h4> : null }
            { data.school ? <h4>School: {data.school.name}</h4> : null }

            { data.desc ? <p>{data.desc[0]}</p> : null }
            { data.higher_level ? <p>{data.higher_level}</p> : null }

          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
