import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../auxillary'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    render () {
      return (
        <Aux>
          <Modal>
            <div style={{ textAlign: 'center' }}>Something didn't work!</div>
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler
