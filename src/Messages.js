import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import MessagePane from './MessagePane'
import { browserHistory } from 'react-router'

export default class Messages extends Component {
  constructor(props){
    super(props)
    this.state = {
      to: "",
      text: "",
      messages : []
    };
  }

  componentDidMount(){

    setInterval(this.recieveMessage.bind(this), 3000)

  }

  fromSet() {
    this.setState({from: this.props.username});
  }
  toSet(event){
    this.setState({to: event.target.value});
  }
  textSet(event) {
    this.setState({text: event.target.value});
  }
  keyPress(event){
    if(event.key === 'Enter'){
      this.submitMessage()
    }
  }

  submitMessage(){
    console.log(this.state)
    console.log(this.props.username)
    $.ajax({
        method: 'POST', 
        url:'http://localhost:3001/api/messages',
        contentType: 'application/json',
        data: JSON.stringify({
            from: this.props.username,
            to: this.state.to,
            text: this.state.text,
            token: this.props.token
          })
    })
      .done((result) => {
        this.setState({text: ''})
        this.recieveMessage()
        console.log(result) 
    }) 
  }

recieveMessage(){

    var self = this
    $.get('http://localhost:3001/api/messages', 
        {
          user: this.state.to,
          token: this.props.token
        }, 
        function(response){ 
            self.setState({messages : response})
        })
  }

    render() {
      if(this.props.cookieLoaded && !this.props.token){
        browserHistory.push('/Login')
      }
      return (
        <div>
        {this.props.token ? 'You are logged in!' : 'NOT LOGGED IN'}
        <div className="App">
        <h2>HMU</h2>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
          </div>
          <div>
            {/*<label htmlFor="from">From:</label>
            <input className="from" type="textbox" onChange={this.fromSet.bind(this)}></input>*/}
            <label htmlFor="to">To:</label>
            <input className="to" type="textbox" onChange={this.toSet.bind(this)}></input> <br/>
            <br/><textArea className="Message" value={this.state.text} onKeyPress={this.keyPress.bind(this)} placeholder="Enter Message" onChange={this.textSet.bind(this)}></textArea><br/>
            <button onClick={this.submitMessage.bind(this)}>Submit</button><br/> <br/>
          </div>
          <div>
            {/*<label htmlFor="user1">User1:</label>
            <input className="user1" type="textbox" onChange={this.user1Set.bind(this)}></input>*/}

            <MessagePane messages={this.state.messages.slice(this.state.messages.length - 5)} />
          </div>
        </div>
        </div>
      );
    }
}