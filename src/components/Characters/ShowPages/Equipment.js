import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Button } from 'semantic-ui-react'
import EquipmentModal from './ShowModals/EquipmentModal'
import { updateCharacter } from '../../../redux/actions'

class Equipment extends Component {

  addItem = (item) => {
    const character = { ...this.props.character }
    character.equipment = [...character.equipment, item]
    this.props.updateCharacter(character)
  }

  removeItem = (item) => {
    const character = { ...this.props.character }
    const itemIndex = character.equipment.findIndex(el => el === item)
    character.equipment.splice(itemIndex, 1)
    this.props.updateCharacter(character)
  }

  mappedEquipment = () => {
    let equipment = {}
    let unique = []

    this.props.character.equipment.forEach(item => {
      if (equipment[item.name]) {
        equipment[item.name] += 1
      } else {
        equipment[item.name] = 1
        unique.push(item)
      }
    })

    unique.sort((a, b) => {
      if (a["name"] < b["name"]) {
      	return -1
      } else if (a["name"] > b["name"]) {
        return 1
      } else {
        return 0
      }
    })

    return unique.map(item => {
      return (
        <li key={item.name}>
          <h5>
            {
              this.props.edit ?
                <React.Fragment>
                  <Button type="button" onClick={() => this.removeItem(item)} icon="minus" />
                  <Button type="button" onClick={() => this.addItem(item)} icon="plus" />
                </React.Fragment>
              :
                null
            }
            {equipment[item.name]} {item.name}
          </h5>
            <EquipmentModal item={item} />
            <Divider />
        </li>
      )
    })
  }

  render() {
    return (
      <ul>
        {this.mappedEquipment()}
      </ul>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCharacter: (character) => { dispatch( updateCharacter(character) )}
  }
}

export default connect(null, mapDispatchToProps)(Equipment)
