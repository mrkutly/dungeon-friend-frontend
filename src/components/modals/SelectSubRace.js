import React, { Component } from 'react'
import Adapter from '../../Adapter'
import { Modal, Button, Icon } from 'semantic-ui-react'

class SelectSubRace extends Component {

  state = {
    subraces: null
  }

  subraceUrls = () => {
    return this.props.subraces.map(subrace => subrace.url)
  }

  componentDidMount() {
    const urls = this.subraceUrls()
    console.log(urls)
    // fetch('http://localhost:3000/subraces', {headers: {urls: urls}})
  }

  render() {
    return (
      <Modal trigger={<Button type="button">Choose your subrace</Button>}>
      <Modal.Header>Sub Races</Modal.Header>
      <Modal.Content >
        <Modal.Description>
          <ul>

          </ul>


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

export default SelectSubRace
