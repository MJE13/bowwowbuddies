import React, { Component } from 'react'
import './App.css';
import $ from 'jquery';
import './Profile';
import HomePane from './HomePane';
import SentMessagePane from './SentMessagePane';
import {browserHistory} from 'react-router';
import { apiUrl } from '../config'


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
	// markTrue(key){
	// 	var messages = this.state.messages //can't just go change a variable in messages
	// 	messages.map((message) =>{
	// 		if (message._id == key){
	// 			message.recieved = true
	// 		}
	// 		return message
	// 	})//so we are going to change the small bit 
	// 	this.setState({messages:messages}) //sending array back
	// }
	getProfile(token){
		var self = this
		$.get(apiUrl + '/api/profile',
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
		$.get(apiUrl + '/api/sentMessages',
		     {token: token}, //, to: this.props.params.username, recieved: false.  checking token to authenticate the user for the ajax call to go through

		    function(response){ 
		    	console.log(response)
		        self.setState({messages: response || []});
		    }
		)
	}

	render() {
		console.log(this.state.messages)
		if(this.props.cookieLoaded && !this.props.token){ //checking token to authenticate the user for the ajax call to go through
		    browserHistory.push('/Login')
		}
		return(

				<div className="Homepage">
					<h1 className="header">Welcome to Bow Wow Buddies!</h1>
					<br/>
					<div>
					<HomePane profile={this.state.profile} /> 
					<label className="header">Message Board: </label>
					<SentMessagePane messages={this.state.messages.slice(Math.max(0, this.state.messages.length-5))} />
					</div>

				</div>
			);
		}
		
		//{/*sendMarkTrue={this.markTrue.bind(this)} */}
}
