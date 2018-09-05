import React from 'react';
import ThreeScene from './ThreeScene'

const Logo = (props) => {
  return (
    <div className="logo">
      <div className="site-name"> Dungeon Friend </div>
      <ThreeScene rotation={[0, -0.008]} sizeDivisor={10} />
      <ThreeScene rotation={[0.008, 0]} sizeDivisor={10} />
      <ThreeScene rotation={[0, 0.008]} sizeDivisor={10} />
    </div>
  )
}

export default Logo
