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
      text: "",
      messages : []
    };
  }

  componentDidMount(){
    console.log('message props', this.props)
    setInterval(this.recieveMessage.bind(this), 3000)

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
    $.ajax({
        method: 'POST', 
        url:'http://localhost:3001/api/messages',
        contentType: 'application/json',
        data: JSON.stringify({
            from: this.props.username,
            to: this.props.params.username,
            text: this.state.text,
            token: this.props.token // require a token becuase we tell this route to requireLogin, this ajax call needs authorization
          })
    })
      .done((result) => {
        this.setState({text: ''})//after it submits a message, it clears out the text inbox and lets that message RIP! 
        this.recieveMessage() //recieves messages after submits info
    }) 
  }

recieveMessage(){

    var self = this 
    $.get('http://localhost:3001/api/messages', 
        {
          user: this.props.params.username, //recieve messages from the 'to' field
          token: this.props.token //checking token to authenticate the user for the ajax call to go through
        }, 
        function(response){ 
            self.setState({messages : response})
        })
  }

    render() {
      if(this.props.cookieLoaded && !this.props.token){ //if the cookie has not loaded or a token has not been granted; you are re-directed to /Login
       browserHistory.push('/Login') // 'push' you to login page
      }
      return (
        <div className="App">
      
          <div>
            <br/><textArea className="Message" value={this.state.text} onKeyPress={this.keyPress.bind(this)} placeholder="Enter Message" onChange={this.textSet.bind(this)}></textArea><br/>
            <button className="button" onClick={this.submitMessage.bind(this)}>Submit</button><br/> <br/>
          </div>
          <div>
            <MessagePane messages={this.state.messages.slice(Math.max(0,this.state.messages.length - 5))} /> {/*limits message history to the last five messages / lines*/}
          </div>
        </div>
      );
    }
}