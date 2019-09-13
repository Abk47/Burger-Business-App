import React from 'react'
import Aux from '../../../hoc/auxillary'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map((igKey, i) => {
      return <li key={i}>
        <span style={{ textTransform: 'capitalize' }}> {igKey} </span>: {props.ingredients[igKey]}
      </li>
    })
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
        <h3><strong>Total Price: Tshs. {props.price} </strong></h3>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' clicked={props.cancel}>CANCEL</Button>
        <Button btnType='Success' clicked={props.order}>ORDER</Button>
      </ul>
    </Aux>
  )
}

export default OrderSummary
