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
            validation: {
              required: true,
              MinLength: 6
            },
            valid:false
          },
          email: {
            elementType: 'input',
            elementConfig:{
              type: 'email',
              placeholder:'Enter Your Email'
            },
            value: '',
            validation: {
              required: true,
              MinLength: 6,
              emailMatch: true
            },
            valid:false
          },
          street: {
            elementType: 'input',
            elementConfig:{
              type: 'text',
              placeholder:'Enter Your Street Address'
            },
            value: '',
            validation: {
              required: true
            },
            valid:false
          },
          phone: {
            elementType: 'input',
            elementConfig:{
              type: 'text',
              placeholder:'Enter Your Phone Number'
            },
            value: '',
            validation: {
              required: true,
            },
            valid:false
          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig:{
             options: [
               { value: 'delivery', displayValue: 'Delivery' },
               { value: 'pick-up', displayValue: 'Pick-up' }
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
        const formData = {}
        for(let formElementIdentifier in this.state.orderForm){
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          orderData: formData
        }
        try {
        await axios.post('/orders.json', order)
          this.setState({ loading: false })
          this.props.history.push('/')
        } catch (error) {
          this.setState({ loading: false })
        }
    }

    checkValidity = (value, rules) => {
      let isValid = true

      if(rules.required){
        isValid = value.trim() !== '' && isValid
      }

      if(rules.MinLength){
        isValid = value.length >= rules.MinLength && isValid
      }

      if(rules.emailMatch){
        isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? isValid = true: isValid = false
      }

      return isValid
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
      // Adding validation
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
      console.log(updatedFormElement)
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
  <form onSubmit={this.orderHandler}>
    {formElementsArray.map(formElement => (
      <Input 
        key={formElement.id} 
        elementConfig={ formElement.config.elementConfig } 
        elementType={ formElement.config.elementType } 
        value={ formElement.config.value }
        changed={ (e) => this.inputChangedHandler(e, formElement.id) } />      
    ))}
    <Button btnType='Success'>ORDER</Button>
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
