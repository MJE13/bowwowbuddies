import React, { Component } from 'react'
import './App.css';
import $ from 'jquery';
import {browserHistory, Link} from 'react-router'
import { apiUrl } from '../config'

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
			url: apiUrl + '/api/authenticate',
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
	keyPress(event){
	  if(event.key === 'Enter'){
	    this.submitLogin()
	  }
	}
	render() {
		return(
			<div className="App">
				<img src="Doggies.gif" alt="doglogo" /><br/>
				<div className="LoginHeader"><h1>Bow Wow Buddies</h1>
				<h2 className="header2">Tinder for Dogs</h2>
				</div>
				
				<section className="LoginPageContainer">
				<form className="LoginForm">
				<input className="Username" type="textbox" placeholder="Username" onChange={this.userName.bind(this)}></input>
				<input className="Password" type="password" placeholder="Password" onChange={this.passWord.bind(this)} value={this.state.password} onKeyPress={this.keyPress.bind(this)}></input>
				</form>
				</section>
				<div className="LoginButton">
				<button className="button" onClick={this.submitLogin.bind(this)}> Login</button><br/>
				<footer className="Join"><a href="http://localhost:3000/profile"> Join the Bow Wow Community :)</a></footer>
				</div>
			</div>
	)};
}
