import React from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'

const SelectProficiencies = (props) => {
  console.log(props)
  const { choices } = props
  const mappedChoices = choices.map(choice => {
    if(choice.from) {
      return (
        <React.Fragment key={choice.from[0].name}>
          <Header>Choose {choice.choose} from</Header>
          <ul>
            {choice.from.map(option => <li key={option.url}>{option.name}</li>)}
          </ul>
        </React.Fragment>
      )
    }
  })

  return (
    <Modal trigger={<Button type="button">Choose your proficiencies</Button>}>
     <Modal.Header>Proficiencies</Modal.Header>
     <Modal.Content >
       <Modal.Description>
         {mappedChoices}


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

const mapStateToProps = (state) => {
  let jobChoices = state.currentJob.data.proficiency_choices
  let raceChoices = (state.currentRace.data.starting_proficiency_options|| {})
  return {
    choices: [...jobChoices, raceChoices]
  }
}

export default connect(mapStateToProps)(SelectProficiencies)
