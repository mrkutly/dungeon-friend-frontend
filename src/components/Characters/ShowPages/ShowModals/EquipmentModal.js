import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import Pack from '../Pack'
import Adapter from '../../../../Adapter'

class EquipmentModal extends Component  {

  state = {
    data: {}
  }

  componentDidMount() {
    const { url } = this.props.item
    Adapter.getData(url).then(data => this.setState({ data }))
  }

  render() {
    const { item } = this.props
    const { category_range, damage, range, throw_range, contents, desc, gear_category, armor_category, armor_class, equipment_category } = this.state.data
    const two_handed = this.state.data["2h_damage"]

    return (
      <Modal trigger={<a className="modal-trigger">See info</a>}>
        <Modal.Header>{item.name}</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            {/* Weapon Info */}
            { category_range ? <p>Range - {category_range}</p> : null }
            { damage ? <p>Damage - {damage.damage_type.name} : {damage.dice_count}d{damage.dice_value}</p> : null }
            { two_handed ? <p>Two-Handed Damage - {two_handed.damage_type.name} : {two_handed.dice_count}d{two_handed.dice_value}</p> : null }
            { range && range.normal ? <p>Normal Range - {range.normal} ft.</p> : null}
            { range && range.long ? <p>Long Range - {range.long} ft.</p> : null}
            { throw_range && throw_range.normal ? <p>Normal Throw Range - {throw_range.long} ft.</p> : null}
            { throw_range && throw_range.long ? <p>Long Throw Range - {throw_range.long} ft.</p> : null}

            {/* Armor Info */}
            { armor_category && equipment_category ? <p>Category - {armor_category} {equipment_category}</p> : null }
            { armor_class ? <p>Armor Class - {armor_class.base}</p> : null }

            {/* Gear Info */}
            { gear_category ? <h4>Category - {gear_category}</h4> : null }
            { desc ? <p>{desc[0]}</p> : null }

            {/* Pack Info */}
            { contents ? <Pack item={this.state.data} /> : null }

          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default EquipmentModal
