import React, { Component } from 'react'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'

class SelectTraits extends Component {


  render() {
    // console.log(this.props)
    return (
      <Modal trigger={<Button type="button">Choose your traits</Button>}>
        <Modal.Header>Traits</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>hello</Header>


          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" primary>
            Proceed <Icon name='right chevron' />
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default SelectTraits
