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
    <p>Current Price: <strong>{props.price}</strong></p>
    {controls.map((ctrl, i) => {
      return <BuildControl
        key={i}
        label={ctrl.label}
        moreClicked={() => props.ingredientsAdder(ctrl.type)}
        lessClicked={() => props.ingredientsRemover(ctrl.type)}
        disabled={props.disabled[ctrl.type]} />
    })}
    <button className={classes.OrderButton}>ORDER NOW</button>
  </div>
)

export default BuildControls
