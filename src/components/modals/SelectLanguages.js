import React from 'react'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'

const SelectLanguages = (props) => {

  return (
    <Modal trigger={<Button type="button">Choose your languages</Button>}>
     <Modal.Header>Languages</Modal.Header>
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

export default SelectLanguages
