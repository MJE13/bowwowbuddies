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
      text: ""
    };
  }

  user1Set(event) {
    this.setState({user1: event.target.value});
  }
  user2Set(event){
    this.setState({user2: event.target.value});
  }
  textSet(event) {
    this.setState({text: event.target.value});
  }
  // timestampSet(event){
  //   this.setState({timestamp: this.state.date.toLocaleTimeString()})
  // }



  submitMessage(){
    $.ajax({
        method: 'PUT', 
        url:'http://localhost:3001/api/messages',
        contentType: 'application/json',
        data: JSON.stringify({
            user1: this.state.user1,
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
            <img src={logo} className="App-logo" alt="logo"/>
          </div>
            <input className="user1" type="textbox" onChange={this.user1Set.bind(this)}></input>
            <input className="user2" type="textbox" onChange={this.user2Set.bind(this)}></input>
            <textArea className="Message" onChange={this.textSet.bind(this)}></textArea>
            <button onClick={this.submitMessage.bind(this)}>Submit</button>
        </div>
      );
    }
}