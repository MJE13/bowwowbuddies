import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import SearchPane from './SearchPane';
import { browserHistory } from 'react-router'

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
          address: "",
          distance: "",
          userlist: []
    };
  }
  

  addressSet(event) {
    this.setState({address: event.target.value});
  }

  distanceSet(event) {
  	this.setState({distance: event.target.value});
  }
  // autoAddress(event){
  //   this.setState({address: event});
  // }


  // submitSearch(){
  //   $.ajax({
  //       method: 'POST', 
  //       url:'http://localhost:3001/api/search',
  //       contentType: 'application/json',
  //       data: JSON.stringify({
  //         address: this.state.address
  //         })
  //   })
  //     .done((result) => {
  //       console.log(result)
  //   }) 
  // }

  searchResult(){
    var self = this
    $.get('http://localhost:3001/api/user', 
          {address: this.state.address, distance: this.state.distance}, 
          function(response){ 
              console.log(response)
              self.setState({userlist : response})
          })
  }

    render() {

      if(this.props.cookieLoaded && !this.props.token){
        browserHistory.push('/Login')
      }
      return (
        <div>
        <div className="App">
        <h2>Find a Bow Wow!</h2>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
          </div>
          <div>
            <label htmlFor="location"> Search for dogs within : (Distance in Miles) </label>
            <input className="location" type="textbox" onChange={this.distanceSet.bind(this)}></input>
            <label htmlFor="address"> Address:</label>
            <input className="address" type="textbox" value={this.state.address} onChange={this.addressSet.bind(this)}></input><br/>
            <button onClick={() =>this.setState({address: this.props.address})}>Insert Address </button>
            <button onClick={this.searchResult.bind(this)}>Search</button><br/> <br/>
            <SearchPane userlist={this.state.userlist} />
          </div>
               </div>
        </div>
      );
    }
}