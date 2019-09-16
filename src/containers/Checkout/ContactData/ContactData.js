import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }
render() {
    return (
         <div>
             <h4>Enter your contact details here</h4>
             <form>
                 <input type='text' name='name' placeholder='Full Name' />
                 <input type='email' name='email' placeholder='Email address' />
                 <input type='text' name='street' placeholder='Street' />
                 <input type='text' name='postalCode' placeholder='Postal code' />
                 <Button btnType='success'>Place ORDER</Button>
             </form>
         </div>

    )
}
}

export default ContactData
