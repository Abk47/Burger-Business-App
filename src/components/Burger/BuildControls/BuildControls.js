import React from 'react'

import classes from './BuildControls.css'
import BuildControl from '../BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' }
]

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map((ctrl, i) => {
      return <BuildControl key={i} label={ctrl.label} />
    })}
  </div>
)

export default BuildControls
