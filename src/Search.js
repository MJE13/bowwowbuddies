import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import SearchPane from './SearchPane';
import { browserHistory } from 'react-router'
// import '../controllers/search';

export default class Search extends Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
          address: "",
          distance: "",
          userlist: []
    };
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({address: nextProps.address});
  }
  addressSet(event) {
    this.setState({address: event.target.value});
  }

  distanceSet(event) {
  	this.setState({distance: event.target.value});
  }

  searchResult(){
    var self = this
    console.log("search submitted")
    $.get('http://localhost:3001/api/user?token=' + this.props.token, 
          {address: this.state.address, distance: this.state.distance}, 
          function(response){ 
              self.setState({userlist : response})
          })
  }

  keyPress(event){
    if(event.key === 'Enter'){
      this.searchResult()
      this.setState({address: ''}),
      this.setState({distance: ''})
    }
  }
    render() {

      if(this.props.cookieLoaded && !this.props.token){
        browserHistory.push('/Login')
      }
      return (
        <div>
        <div className="App">
        <h1 className="header">Find a Bow Wow!</h1>
          <div className="App-header">
            {/*<img src={logo} className="App-logo" alt="logo"/>*/}
          </div>
          <div onKeyPress={this.keyPress.bind(this)}>
            <label htmlFor="location"> Search for dogs within </label>
            <input className="location" type="textbox" value={this.state.distance} onChange={this.distanceSet.bind(this)}></input>
            <label htmlFor="address"> miles from address:</label>
            <input className="address" type="textbox" value={this.state.address} onChange={this.addressSet.bind(this)}></input><br/>
            <button onClick={this.searchResult.bind(this)}>Search</button><br/> <br/>
            <SearchPane userlist={this.state.userlist} />
          </div>
          </div>
        </div>
      );
    }
}