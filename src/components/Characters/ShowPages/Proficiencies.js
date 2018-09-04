import React from 'react'
import { Divider } from 'semantic-ui-react'

const Proficiencies = (props) => {

  const mappedProfs = () => {
    const { profs } = props

    return profs.map(prof => {
      return (
        <li key={prof.name}>
          <h5>
            {prof.name}
          </h5>
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

export default Proficiencies
