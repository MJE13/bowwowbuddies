import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
//setState 
//functions for setting username and password with ajax call when click submit button
//different api ajax method for posting message, and another for app.put


  submitEvent(){
    $.ajax({
            method: 'POST', 
            url:'http://localhost:3001/api/user',
            contentType: 'application/json',
            data: JSON.stringify({
                name: this.state.name,
                date: this.state.date
              })
          })
          .done(function(result){
            console.log(result)
          })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Bow Wow Buddies</h2>
        </div>
        <p className="App-intro">
          woof woof arf arf woof
        </p>
      </div>
    );
  }
}

export default App;
