import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import ReactDom from 'react-dom';

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      imgURL: "",
      username: "",
      password: "",
      address: "",
      about: "",
      dogname: "",
      sex: "",
      age: "",
      size: "",
      breed: "",
      energylevel: "",
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

  sexSet(event){
    this.setState({sex: event.target.value});
  }

  ageSet(event){
    this.setState({age: event.target.value});
  }

  sizeSet(event){
    this.setState({size: event.target.value});
  }

  setBreed(event) {
    this.setState({breed: event.target.value});
  }

  energylevelSet(event){
    this.setState({energylevel: event.target.value});
  }

  anySet(event) {
    this.setState({anything: event.target.value});
  }

  // photoSet(event) {
  //   this.setState({imgURL: event.target})
  // }


  submitProfile(e){
    e.preventDefault();
    var fd = new FormData();   
    fd.append('profilePicture', ReactDom.findDOMNode(this.refs.file).files[0]); //appending the profile pic hi tom
    for (var key in this.state){
      fd.append(key, this.state[key]) //sending in form data hi tom
    }
    $.ajax({
        method: 'POST', 
        url:'http://localhost:3001/api/user',
        processData: false,
        contentType: false,
        data: fd
      })
      .done(function(result){
        console.log(result)
      }) 
    }

    render() {
      return (
        <div className="App">
        <h1>YOU WILL COMPLY</h1>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <form ref="uploadForm" className="uploader" encType="multipart/form-data">
            <p>
              <h2 htmlFor="headProfile">Owner Profile</h2>
              <label htmlFor="user">Create a Username</label>
              <input className="user" type="textbox" onChange={this.userName.bind(this)}></input><br/>
              <label htmlFor="password">Create a Password</label>
              <input className="password" type="textbox" onChange={this.passWord.bind(this)}></input><br/>
              <label htmlFor="address">Address:</label>
              <input className="address" type="textbox" onChange={this.addRess.bind(this)}></input><br/>
              <label htmlFor="about">About you and your pooch:</label>
              <textArea className="about" onChange={this.aboutYou.bind(this)}></textArea>
            </p>
            <p>
              <h2 htmlFor= "headProfile">Dog Profile</h2>
              <img src="user.imgURL"/>
              <label htmlFor="profilePicture">Upload a Profile Picture </label>
              <input ref="file" type="file" name="file" className="upload-file"/><br/>
              <label htmlFor="dogname">Name</label>
              <input className="dogname" type="textbox" onChange={this.dogName.bind(this)}></input>
              <label htmlFor="sex">Sex</label>
              <select className="sex" onChange={this.sexSet.bind(this)} value={this.state.sex}>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              <label htmlFor="age">Age</label>
              <select className="age">
                <option value="0-6 mo">Less than 6 months</option>
                <option value="6-12 mo">6-12 months</option>
                <option value="1-2">1-2 years</option>
                <option value="2-4">2-4 years</option>
                <option value="5-8">5-8 years</option>
                <option value="9-12">9-12 years</option>
                <option value=">12">over 12 years</option>
              </select>
              <label htmlFor="size">Size</label>
              <select className="size">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
              <label htmlFor="breed">Breed</label>
              <input className="breed" type="textbox" onChange={this.setBreed.bind(this)}></input><br/>
              <label htmlFor="energylevel">Energy Level</label>
              <select className="energylevel">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <label htmlFor="anything">Anything else?</label>
              
              <textArea className="anything" onChange={this.anySet.bind(this)}></textArea>
            </p>
            <button onClick={this.submitProfile.bind(this)}>Submit</button>
            </form> 
        </div>
      );
    }
}