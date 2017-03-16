import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

export default class Login extends Component {
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: ""
		};
	}

	render() {
		return(
				<div className="Homepage">
					<h1>Welcome to Bow Wow Buddies!</h1>
					<br/>
					<a href="./profile">Edit Profile</a><br/>
					<a href="./messages">Messages</a><br/>
					<a href="./search">Find a Buddy</a><br/>

				</div>
			);
		}
		
}
