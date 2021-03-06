import React from 'react'
import { Divider } from 'semantic-ui-react'
import FeatureModal from './ShowModals/FeatureModal'

const Features = (props) => {

  const mappedFeats = () => {
    const { features } = props
    let i = 0
    return features.map(feat => {
      i++
      return (
        <li key={`${feat.name} - ${i}`}>
          <h5>
            {feat.name}
          </h5>
            <FeatureModal feat={feat} />
            <Divider />
        </li>
      )
    })
  }

  return (
    <ul>
      {mappedFeats()}
    </ul>
  )
}

export default Features
