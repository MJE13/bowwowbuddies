import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      address: "",
      about: "",
      dogname: "",
      breed: "",
      anything: ""
    };
  }

  userName(event) {
    this.setState({username: event.target.value});
  }
  
  passWord(event) {
    this.setState({password: event.target.value});
  }

  addRess(event) {
    this.setState({address: event.target.value});
  }

  aboutYou(event) {
    this.setState({about: event.target.value});
  }

  dogName(event) {
    this.setState({dogname: event.target.value});
  }

  setBreed(event) {
    this.setState({breed: event.target.value});
  }

  anySet(event) {
    this.setState({anything: event.target.value});
  }

  submitProfile(){
    $.ajax({
        method: 'POST', 
        url:'http://localhost:3001/api/user',
        contentType: 'application/json',
        data: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            address: this.state.address,
            about: this.state.about,
            dogname: this.state.dogname,
            breed: this.state.breed,
            anything: this.state.anything
          })
      })
      .done(function(result){
        console.log(result)
      }) 
    }

    render() {
      return (
        <div className="App">
        <h2>YOU WILL COMPLY</h2>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
            <label htmlFor="user">Create a Username</label>
            <input className="user" type="textbox" onChange={this.userName.bind(this)}></input>
            <label htmlFor="password">Create a Password</label>
            <input className="password" type="textbox" onChange={this.passWord.bind(this)}></input>
            <label htmlFor="address">Address:</label>
            <input className="address" type="textbox" onChange={this.addRess.bind(this)}></input>
            <label htmlFor="about">About you and your pooch:</label>
            <textArea className="about" onChange={this.aboutYou.bind(this)}></textArea>
            <p>Dog Profile</p>
            <label htmlFor="dogname">Name</label>
            <input className="dogname" type="textbox" onChange={this.dogName.bind(this)}></input>
            <label htmlFor="breed">Breed</label>
            <input className="breed" type="textbox" onChange={this.setBreed.bind(this)}></input>
            <label htmlFor="anything">Anything else?</label>
            <textArea className="anything" onChange={this.anySet.bind(this)}></textArea>
            <button onClick={this.submitProfile.bind(this)}>Submit</button>
        </div>
      );
    }
}