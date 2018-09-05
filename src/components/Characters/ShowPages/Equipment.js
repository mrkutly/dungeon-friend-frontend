import React, { Component } from 'react'
import EquipmentModal from './ShowModals/EquipmentModal'
import { Divider } from 'semantic-ui-react'

export default class Equipment extends Component {

  mappedEquipment = () => {
    let equipment = {}
    let unique = []

    this.props.equipment.forEach(item => {
      if (equipment[item.name]) {
        equipment[item.name] += 1
      } else {
        equipment[item.name] = 1
        unique.push(item)
      }
    })

    return unique.map(item => {
      return (
        <li key={item.name}>
          <h5>
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
