import React from 'react'
import { Divider } from 'semantic-ui-react'

const Languages = (props) => {

  const mappedLangs = () => {
    const { langs } = props
    let i = 0
    return langs.map(lang => {
      i++
      return (
        <li key={`${lang.name} - ${i}`}>
          <h5>
            {lang.name}
          </h5>
            <Divider />
        </li>
      )
    })
  }

  return (
    <ul>
      {mappedLangs()}
    </ul>
  )
}

export default Languages
