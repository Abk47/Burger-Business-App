import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = async (e) => {
        e.preventDefault()
        this.setState({ loading: true})
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.totalPrice,
          customer: {
            address: {
              city: 'Beijing',
              country: 'China'
            },
            email: 'drama@mailer.com',
            name: 'Smith Will'
          }
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
    <input className={classes.input} type='text' name='name' placeholder='Full Name' />
    <input className={classes.input} type='email' name='email' placeholder='Email address' />
    <input className={classes.input} type='text' name='street' placeholder='Street' />
    <input className={classes.input} type='text' name='postalCode' placeholder='Postal code' />
    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
  </form>
  )
  if(this.state.loading){
    form = <Spinner />
  }
    return (
         <div className={classes.ContactData}>
             <h4>Enter your contact details here</h4>
             {form}
         </div>
    )
}
}

export default withRouter(ContactData)
