import React, { Component } from 'react'
import './App.css';
import $ from 'jquery';
//import './Profile';
import FriendPane from './FriendPane';
import {browserHistory} from 'react-router';

export default class Friend extends Component {
	constructor(props){
		super(props)
		this.state = {
			profile: {}
		};
	}

	render() {
		var self = this
		$.get('http://localhost:3001/api/findFriend/:username',
		      {token: this.props.token}, //checking token to authenticate the user for the ajax call to go through
		    function(response){ 
		    	console.log(response)
		        self.setState({profile: response});
		    })
		if(this.props.cookieLoaded && !this.props.token){ //checking token to authenticate the user for the ajax call to go through
		    //browserHistory.push('/Login')
		}
		return(

				<div className="Friendsearchpage">
					<h1>Welcome to Bow Wow Buddies!</h1>
					<br/>
					<div>
					  <FriendPane profile={this.state.profile} /> 
					</div>

				</div>
			);
		}
		
}