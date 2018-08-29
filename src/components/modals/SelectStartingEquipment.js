import React from 'react'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'

const SelectStartingEquipment = (props) => {

  return (
    <Modal trigger={<Button>Choose your starting equipment</Button>}>
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

export default SelectStartingEquipment
