import React from 'react'
import { Divider } from 'semantic-ui-react'

const Proficiencies = (props) => {

  const mappedProfs = () => {
    const { profs } = props
    let i = 0
    return profs.map(prof => {
      i++
      return (
        <li key={`${prof.name} - ${i}`}>
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
