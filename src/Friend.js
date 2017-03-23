import React, { Component } from 'react'
import './App.css';
import $ from 'jquery';
//import './Profile';
import FriendPane from './FriendPane';
import {browserHistory} from 'react-router';
import Messages from './Messages'
import { apiUrl } from '../config'

export default class Friend extends Component {
	constructor(props){
		super(props)
		this.state = {
			profile: {}
		};
	}

	componentWillMount(){
		console.log(this.props)
		var self = this
		$.get(apiUrl + '/api/findFriend/' + this.props.params.username		,
		    {token: this.props.token}, //checking token to authenticate the user for the ajax call to go through
		    function(response){ 
		    	console.log(response)
		        self.setState({profile: response});
		    })
	}

	render() {
		console.log('processsssssss',process.env)
		if(this.props.cookieLoaded && !this.props.token){ //checking token to authenticate the user for the ajax call to go through
		    browserHistory.push('/Login')
		}
		return(

				<div className="App">
					<h1 className="header">Welcome to Bow Wow Buddies!</h1>
					<br/>
					<div>
					  <FriendPane
					   profile={this.state.profile} /><br/> 
					</div> 
					<div>
					<label>Send a message to {this.props.params.username}:</label>
					<Messages {...this.props} />
					</div>
				</div>
			);
		}
		
}