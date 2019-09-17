import React, { Component } from 'react'
import Aux from '../../hoc/auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
  salad: 500,
  meat: 2000,
  bacon: 1500,
  cheese: 1000
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 5000,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount(){
    axios.get('https://burger-app-c590b.firebaseio.com/ingredients.json')
    .then(response => {
      this.setState({ ingredients: response.data})
    })
    .catch( error => {
      this.setState({ error: true });
  })
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

purchaseHandler = () => {
  this.setState({ purchasing: true})
}

purchaseCancelHandler = () => {
  this.setState({ purchasing: false })
}

proceedPayment = async () => {
  const queryParams = []
  for(let i in this.state.ingredients){
    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent([this.state.ingredients[i]]))
  }
  queryParams.push('price=' + this.state.totalPrice)
  const queryString = queryParams.join('&')
  this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
})  
}

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (this.state.ingredients){
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            ingredientsAdder={this.addIngredientHandler} 
            ingredientsRemover={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice} />
        </Aux>
        )

      orderSummary = <OrderSummary 
      ingredients={this.state.ingredients}
      cancel={this.purchaseCancelHandler}
      order={this.proceedPayment}
      price={this.state.totalPrice} />
      }

      if(this.state.loading){
        orderSummary = <Spinner />
      }
    
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
