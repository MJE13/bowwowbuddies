import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import Profile from './Profile'
import SearchPane from './SearchPane'

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
          address: "",
          userlist: []
    };
  }
  addressSet(event) {
    this.setState({address: event.target.value});
  }

  submitSearch(){
    $.ajax({
        method: 'POST', 
        url:'http://localhost:3001/api/search',
        contentType: 'application/json',
        data: JSON.stringify({
          address: this.state.address
          })
    })
      .done((result) => {
        console.log(result)
    }) 
  }

  searchResult(){
    var self = this
    $.get('http://localhost:3001/api/user', 
          {address: this.state.address}, 
          function(response){ 
              console.log(response)
              self.setState({userlist : response})
          })
  }

    render() {
      return (
        <div>
        <div className="App">
        <h2>Find a Bow Wow!</h2>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
          </div>
          <div>
            <label htmlFor="address"> Address:</label>
            <input className="address" type="textbox" onChange={this.addressSet.bind(this)}></input>
            <button onClick={this.searchResult.bind(this)}>Search</button><br/> <br/>
            <SearchPane userlist={this.state.userlist} />
          </div>
               </div>
        </div>
      );
    }
}