import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import './App.css';

export default class Header extends Component {
	constructor(props){ //declaring the state of our header, not quite sure what super does? maybes overrides other props? idk...
		super(props)
		this.state = {
			token: '',
			address: '',
			username: ''
		}
	}

	componentDidMount(){ //research componentDidMount
		if(document.cookie){// if you get a cookie, it is encoded data; 
			this.setState(Object.assign(JSON.parse(document.cookie), {cookieLoaded: true})) //.JSON.parse turns the information into an object (notation)
		} else { //the assign (above) is adding 'cookieLoaded' key value pair to our document.cookie
			this.setState({cookieLoaded: true})
		}
	}

	login(userdata){
		document.cookie = JSON.stringify(userdata) //contains all of the user data in our header
		this.setState(Object.assign(userdata, {cookieLoaded: true}))// needed to include cookieloaded field: becuase page was trying to load before page could recieve the cookie
	}

	logout(){
		document.cookie = ''; //on logout we set that cookie to mean absolutely nothing and that way we have no access :(
		this.setState({token: '', cookieLoaded: false, address: '', username: ''}) // resets all your data to nothing, becuase that's what you are when you leave our site.
		browserHistory.push('/Login')// sends you back to the login page; 
	}

	render(){
		if (this.props.location.pathname.toLowerCase() === '/login') {
			return(
				<div>
					{this.props.children && React.cloneElement(this.props.children, {
								...this.state, 
									login: this.login.bind(this)
											})}
				</div>
			)	
		} else {
			return ( 
				<div className="App">
					<img src="Doggies.gif" alt="doglogo" />
					<div className="menu">
						<a href="/homepage"> Homepage </a> 
						<a href="/search">  Search </a>		
					</div>
						<div>{this.state.token ? <button className="button" onClick={this.logout.bind(this)}>Log out</button> : ''} {/*shows us the state of our header upon login, the clone element, shows current state and makes sure previous state does not interfere*/}
								{this.props.children && React.cloneElement(this.props.children, {
									...this.state, /*this some fly ass es6 shit to refer to all of our state elements*/
											login: this.login.bind(this)
								})
							}</div>
				</div>	
			)
		}
	}

}