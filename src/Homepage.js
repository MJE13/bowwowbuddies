import React, { Component } from 'react'
import './App.css';
import $ from 'jquery';
import './Profile';
import HomePane from './HomePane';

export default class Homepage extends Component {
	constructor(props){
		super(props)
		this.state = {
			profile: {}
		};
	}
recieveProfile(){
	var self = this
    $.get('http://localhost:3001/api/profile',
          // imgURL: this.state.imgURL,	
          // username: this.state.username, //recieve messages from the 'to' field
          {token: this.props.token}, //checking token to authenticate the user for the ajax call to go through
        function(response){ 
        	console.log(response)
            self.setState({profile: response});
        })
  }

	render() {
		return(

				<div className="Homepage">
					<h1>Welcome to Bow Wow Buddies!</h1>
					<br/>
					<div>
						<button onClick={this.recieveProfile.bind(this)}>Submit</button><br/>
					  <HomePane profile={this.state.profile} /> 
					</div>
					<a href="./profile">Edit Profile</a><br/>
					<a href="./messages">Messages</a><br/>
					<a href="./search">Find a Buddy</a><br/>

				</div>
			);
		}
		
}
