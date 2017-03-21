import React, { Component } from 'react'
import './App.css';
import $ from 'jquery';
import './Profile';
import HomePane from './HomePane';
import SentMessagePane from './SentMessagePane';
import {browserHistory} from 'react-router';

export default class Homepage extends Component {
	constructor(props){
		super(props)
		this.state = {
			profile: {},
			messages: []
		};
	}
	componentWillReceiveProps(nextProps){
		this.getProfile(nextProps.token);
		this.getMessages(nextProps.token);
	}
	componentWillMount(){
		this.getProfile(this.props.token);
		this.getMessages(this.props.token);
	}

	getProfile(token){
		var self = this
		$.get('http://localhost:3001/api/profile',
		     {token: token}, //checking token to authenticate the user for the ajax call to go through
		    function(response){ 
		    	console.log(response)
		        self.setState({profile: response});
		    }
		)
	}
	getMessages(token){
		var self = this
		console.log(this.props)
		$.get('http://localhost:3001/api/sentMessages',
		     {token: token}, // , to: this.props.params.username, recieved: false.  checking token to authenticate the user for the ajax call to go through

		    function(response){ 
		    	console.log(response)
		        self.setState({messages: response});
		    }
		)
	}

	render() {

		if(this.props.cookieLoaded && !this.props.token){ //checking token to authenticate the user for the ajax call to go through
		    browserHistory.push('/Login')
		}
		return(

				<div className="Homepage">
					<h1>Welcome to Bow Wow Buddies!</h1>
					<br/>
					<div>
					  <HomePane profile={this.state.profile} /> 
					</div>
					<a href="./profile">Edit Profile</a><br/>
					<a href="./messages">Messages</a><br/>
					<a href="./search">Find a Buddy</a><br/>
					<div>
						<label>New Messages!</label>
						<SentMessagePane messages={this.state.messages} />
					</div>

				</div>
			);
		}
		
}
