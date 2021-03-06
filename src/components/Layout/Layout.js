import React, { Component } from 'react'
import Aux from '../../hoc/auxillary'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
state = {
  showSideDrawer: false
}

  closingSideDrawer = () => {
    this.setState({ showSideDrawer: false })
  }
  
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }
  
  render () {
    return (
      <Aux>
        <Toolbar DrawerToggleClicked={this.drawerToggleClickHandler} />
        <SideDrawer 
          open={this.state.showSideDrawer} 
          closed={this.closingSideDrawer} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout
