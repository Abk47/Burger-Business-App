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
             options: [{
               value: 'fastest', displayValue: 'Fastest',
               value: 'standard', displayValue: 'Standard',
             }]
            },
            value: ''
        },
        loading: false
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

render() {
  let form = (
  <form>
    <Input inputtype="input" type='text' name='name' placeholder='Full Name' />
    <Input inputtype="input" type='email' name='email' placeholder='Email address' />
    <Input inputtype="input" type='text' name='street' placeholder='Street Address' />
    <Input inputtype="input" type='text' name='phone' placeholder='Mobile Number' />
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
