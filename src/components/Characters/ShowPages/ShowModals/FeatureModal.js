import React, { Component } from 'react'
import Adapter from '../../../../Adapter'
import { Modal } from 'semantic-ui-react'

export default class SkillModal extends Component {

  state = {
    data: {}
  }

  componentDidMount() {
    const { url } = this.props.feat
    Adapter.getData(url).then(data => this.setState({ data }))
  }

  render() {
    const { feat } = this.props
    const { data } = this.state

    return (
      <Modal trigger={<a className="modal-trigger">See info</a>}>
        <Modal.Header>{feat.name}</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <p>{ data.desc ? data.desc[0] : null }</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
