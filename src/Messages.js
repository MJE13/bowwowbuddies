import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

export default class Messages extends Component {
  constructor(props){
    super(props)
    this.state = {
      user1: "",
      user2: "",
      text: "",
      timestamp: {}
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
        url:'http://localhost:3001/api/Messages',
        contentType: 'application/json',
        data: JSON.stringify({
            user2: this.state.user2,
            text: this.state.text
          })
      })
      .done(function(result){
        console.log(result)
      }) 
    }

    render() {
      return (
        <div className="App">
        <h2>HMU</h2>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
            <input className="user2" type="textbox" onChange={this.userName.bind(this)}></input>
            <textArea className="Message" onChange={this.textChange.bind(this)} />
            <button onClick={this.submitProfile.bind(this)}>Submit</button>
        </div>
      );
    }
}