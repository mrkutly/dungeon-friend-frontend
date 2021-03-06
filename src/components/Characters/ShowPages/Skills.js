import React from 'react'
import { Divider } from 'semantic-ui-react'
import SkillModal from './ShowModals/SkillModal'

const Skills = (props) => {

  const mappedProfs = () => {
    const { skills } = props

    return skills.map(skill => {
      return (
        <li key={skill.name}>
          <h5>
            {skill.name}
          </h5>
            <SkillModal skill={skill} />
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

export default Skills
