import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = null
        for( let params of query.entries()){
            if(params[0] === 'price'){
                price = params[1]
            } else{
                ingredients[params[0]] = +params[1]
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price })
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact')        
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelHandler}
                checkoutContinued={this.checkoutContinueHandler} />
                <Route path={this.props.match.path + '/contact'} 
                render={() => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} />} />
            </div>
        );
    }
}

export default Checkout;