import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'
import Adapter from '../../Adapter'

class SelectStartingEquipment extends Component {

  state = {
    starting: [],
    choices: []
  }

  componentDidMount() {
    const { url } = this.props
    Adapter.getStartingEquipment(url)
      .then(({ starting, choices }) => this.setState({ starting, choices }))
  }

  render() {
    console.log(this.state)
    return (
      <Modal trigger={<Button type="button">Choose your starting equipment</Button>}>
        <Modal.Header>Starting Equipment</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>hello</Header>


          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Proceed <Icon name='right chevron' />
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.currentJob.data.starting_equipment.url
  }
}

export default connect(mapStateToProps)(SelectStartingEquipment)
