import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
       orderForm: {
          name: {
            elementType: 'input',
            elementConfig:{
              type: 'text',
              placeholder:'Enter Your Name'
            },
            value: '',
          },
          email: {
            elementType: 'input',
            elementConfig:{
              type: 'email',
              placeholder:'Enter Your Email'
            },
            value: '',
          },
          street: {
            elementType: 'input',
            elementConfig:{
              type: 'text',
              placeholder:'Enter Your Street Address'
            },
            value: '',
          },
          phone: {
            elementType: 'input',
            elementConfig:{
              type: 'text',
              placeholder:'Enter Your Phone Number'
            },
            value: '',
          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig:{
             options: [
               { value: 'fastest', displayValue: 'Fastest Delivery' },
               { value: 'standard', displayValue: 'Standard Delivery' }
            ]
            },
            value: ''
        },
      },
      loading: false,
  }

    orderHandler = async (e) => {
        e.preventDefault()
        this.setState({ loading: true})
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
        }
        try {
        await axios.post('/orders.json', order)
          this.setState({ loading: false })
          this.props.history.push('/')
        } catch (error) {
          this.setState({ loading: false })
        }
    }

    inputChangedHandler = (e, inputIdentifier) => {
      const updatedOrderForm = {
        ...this.state.orderForm
      } 
      // You have to clone a deeply nested objected to get the OG properties
      const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier] 
      }
      updatedFormElement.value = e.target.value
      updatedOrderForm[inputIdentifier] = updatedFormElement
      this.setState({ orderForm: updatedOrderForm })
    }

render() {
  const formElementsArray = []
  for(let key in this.state.orderForm){
    formElementsArray.push({
      id: key,
      config: this.state.orderForm[key]
    })
  }
  let form = (
  <form>
    {formElementsArray.map(formElement => (
      <Input 
        key={formElement.id} 
        elementConfig={ formElement.config.elementConfig } 
        elementType={ formElement.config.elementType } 
        value={ formElement.config.value }
        changed={ (e) => this.inputChangedHandler(e, formElement.id) } />      
    ))}
    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
  </form>
  )

  let displayText = 'Enter your contact details here'

  if(this.state.loading){
    form = <Spinner />
    displayText = 'Placing your order'
  }
    return (
         <div className={classes.ContactData}>
             <h4>{displayText}</h4>
             {form}
         </div>
    )
}
}

export default withRouter(ContactData)
