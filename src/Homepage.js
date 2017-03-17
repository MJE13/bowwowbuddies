import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';


export default class Login extends Component {
	constructor(props){
		super(props)
		this.state = {
			imgURL: "",
			username: "",
			password: ""
		};
	}
recieveMessage(){
    var self = this 
    $.get('http://localhost:3001/api/Profile', 
        {
          imgURL: this.state.imgURL,	
          username: this.state.username, //recieve messages from the 'to' field
          token: this.props.token //checking token to authenticate the user for the ajax call to go through
        }, 
        function(response){ 
            return(response);
        })
  }

	render() {
		return(
				<div className="Homepage">
					<h1>Welcome to Bow Wow Buddies!</h1>
					<br/>
					<img src={this.state.imgURL} className="profilePic"/>
					<a href="./profile">Edit Profile</a><br/>
					<a href="./messages">Messages</a><br/>
					<a href="./search">Find a Buddy</a><br/>

				</div>
			);
		}
		
}
