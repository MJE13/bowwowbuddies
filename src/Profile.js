import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    };
  }

  userName(event) {
    this.setState({username: event.target.value});
  }
  
  passWord(event) {
    this.setState({password: event.target.value});
  }

  submitProfile(){
    $.ajax({
        method: 'POST', 
        url:'http://localhost:3001/api/user',
        contentType: 'application/json',
        data: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
      })
      .done(function(result){
        console.log(result)
      }) 
    }

    render() {
      return (
        <div className="App">
        <h2>YOU WILL COMPLY</h2>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
            <label htmlFor="user">Username</label>
            <input className="user" type="textbox" onChange={this.userName.bind(this)}></input>
            <label htmlFor="password">Password</label>
            <input className="password" type="textbox" onChange={this.passWord.bind(this)}></input>
            <button onClick={this.submitProfile.bind(this)}>Submit</button>
        </div>
      );
    }
}