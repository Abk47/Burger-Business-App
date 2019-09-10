import React, { Component } from 'react'
import Aux from '../../hoc/auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 500,
  meat: 2000,
  bacon: 1500,
  cheese: 1000
}

class BurgerBuilder extends Component {
  state = {
    ingredients : {
      salad : 0,
      bacon : 0,
      meat : 0,
      cheese: 0
    },
    totalPrice: 5000,
    purchasable: false
  }

  purchaseIngredient = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      } , 0)
      this.setState({ purchasable: sum > 0 })
  }

  addIngredientHandler = (type) => {
    const count = this.state.ingredients[type]
    const updatedCount = count + 1
    const updatedIngredients = {
        ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    // Price Update
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.purchaseIngredient(updatedIngredients)
}

removeIngredientHandler = (type) => {
  const count = this.state.ingredients[type]
  if(count <= 0) return null
  const updatedCount = count - 1
  const updatedIngredients = {
    ...this.state.ingredients
  }
  updatedIngredients[type] = updatedCount
  // Price update
  const priceDeduction = INGREDIENT_PRICES[type]
  const oldPrice = this.state.totalPrice
  const newPrice = oldPrice - priceDeduction
  this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
  this.purchaseIngredient(updatedIngredients)
}

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientsAdder={this.addIngredientHandler} 
          ingredientsRemover={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice} />
      </Aux>
    )
  }
}

export default BurgerBuilder
