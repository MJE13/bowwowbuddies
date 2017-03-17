import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import {browserHistory} from 'react-router'

export default class Login extends Component {
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

	submitLogin(){
		var self = this;
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3001/api/authenticate',
			contentType: 'application/json',
			data: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			})
		})
		.done(function(result){
			self.props.login(result)
			console.log(result)
			browserHistory.push('/Homepage')
		})
	}

	render() {
		return(
			<div className="Login">
			<label htmlFor="Username"> Username</label>
			<input className="Username" type="textbox" onChange={this.userName.bind(this)}></input>
			<label htmlFor="Password"> Password</label>
			<input className="Password" type="textbox" onChange={this.passWord.bind(this)}></input>
			<button onClick={this.submitLogin.bind(this)}> Login</button><br/>
			<a href="http://localhost:3000/profile"> Join the Bow Wow Community :)</a>
			</div>
		);
	}
}