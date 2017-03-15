import React, { Component } from 'react';
import {browserHistory} from 'react-router';

export default class Header extends Component {
	constructor(props){
		super(props)
		this.state = {
			token: '',
			address: '',
			username: ''
		}
	}

	componentDidMount(){
		if(document.cookie){
			this.setState(Object.assign(JSON.parse(document.cookie), {cookieLoaded: true}))
		} else {
			this.setState({cookieLoaded: true})
		}
	}

	login(userdata){
		document.cookie = JSON.stringify(userdata)
		this.setState(Object.assign(userdata, {cookieLoaded: true}))
	}

	logout(){
		document.cookie = '';
		this.setState({token: '', cookieLoaded: false, address: '', username: ''})
		browserHistory.push('/Login')
	}
	render(){
		
		return (<div>{this.state.token ? <button onClick={this.logout.bind(this)}>Log out</button> : ''}
											{this.props.children && React.cloneElement(this.props.children, {
																							...this.state, 
																							login: this.login.bind(this)
																						})}
											</div>)
	}

}