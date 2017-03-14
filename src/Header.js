import React, { Component } from 'react';
import {browserHistory} from 'react-router';

export default class Header extends Component {
	logout(){
		document.cookie=''
		browserHistory.push('/Login')
	}
	render(){
		return <div>{document.cookie ? <button onClick={this.logout}>Log out</button> : ''}{this.props.children}</div>
	}

}