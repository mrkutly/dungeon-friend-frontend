import React from 'react'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'

const SelectTraits = (props) => {

  return (
    <Modal trigger={<Button>Choose your traits</Button>}>
     <Modal.Header>Traits</Modal.Header>
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

export default SelectTraits
