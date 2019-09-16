import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Layout>
            <Route path='/' exact component={BurgerBuilder} />
          </Layout>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
