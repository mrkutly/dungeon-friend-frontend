import React from 'react'
import { Divider } from 'semantic-ui-react'
import SpellModal from './ShowModals/SpellModal'

const Spells = (props) => {

  const mappedProfs = () => {
    const { spells } = props

    return spells.map(spell => {
      return (
        <li key={spell.name}>
          <h5>
            {spell.name}
          </h5>
            <SpellModal spell={spell} />
            <Divider />
        </li>
      )
    })
  }

  return (
    <ul>
      {mappedProfs()}
    </ul>
  )
}

export default Spells
