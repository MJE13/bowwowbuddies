import React, { Component } from 'react';

import {Router, Route, Link, browserHistory } from 'react-router' 
import Profile from './Profile'
import Messages from './Messages'
import Search from './Search'
import Login from './Login'
import Header from './Header'

class FourOhFour extends Component {
  render(){
    return <h1>Page not found. Please report to /Profile and comply.</h1>
  }
}


export default class App extends Component {

  render(){ // the various routes to come in
    return (<Router history={browserHistory}>

      <Route path='/' component={Header}>
        <Route path='Login' component={Login}/>
        <Route path='Search' component={Search}/>
        <Route path='Profile' component={Profile}/>
        <Route path='Messages' component={Messages}/>
      </Route>
      <Route path='*' component={FourOhFour}/>
    </Router>)
  }

}
