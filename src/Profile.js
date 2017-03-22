import React, { Component } from 'react'
import './App.css';
import $ from 'jquery';
import ReactDom from 'react-dom';
import {browserHistory} from 'react-router'
import { apiUrl } from '../config'


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
      vaccinations: false,
      sterile: false,
      sex: "Female",
      age: "Less than 6 months",
      size: "Small",
      breed: "",
      energylevel: "Low",
      anything: "",
      imagePreviewUrl: ''
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

  vacChange (event) {
    this.setState({vaccinations: !this.state.vaccinations})
  }

  sterileChange (event) {
    this.setState({sterile: !this.state.sterile})
  }

  anySet(event) {
    this.setState({anything: event.target.value});
  }

  _handleImageChange(e) {
    e.preventDefault()
    console.log('yoooooo', e.target.files)
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      console.log('setting state')
      this.setState({
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  submitProfile(e){
    e.preventDefault();
    var self = this;
    var fd = new FormData();   
    fd.append('profilePicture', ReactDom.findDOMNode(this.refs.file).files[0]); //appending the profile pic hi tom
    for (var key in this.state){
      fd.append(key, this.state[key]) //sending in form data hi tom
    }
    $.ajax({
        method: 'POST', 
        url: apiUrl + '/api/user',
        processData: false,
        contentType: false,
        data: fd
      })
      .done(function(result){
        console.log(result)
        self.props.login({
          token: result.token,
          address: self.state.address,
          username: self.state.username
        })
        browserHistory.push('/Homepage')
      }) 
    }

    render() {
      let { imagePreviewUrl } = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img className="previewImage"src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="previewText"></div>);
      }  
      return (
        <div className="App">
          <h1 className="header">Create a Profile</h1>
            <form ref="uploadForm" className="uploader" onSubmit={(e)=> e.preventDefault()} encType="multipart/form-data">
              <div>
                <h2 htmlFor="header">Owner Profile</h2>
                <label htmlFor="user">Create a Username </label>
                <input className="user" type="textbox" onChange={this.userName.bind(this)}></input><br/>
                <label htmlFor="password">Create a Password </label>
                <input className="password" type="password" onChange={this.passWord.bind(this)}></input><br/>
                <label htmlFor="address">Address </label>
                <input className="address" type="textbox" onChange={this.addRess.bind(this)}></input><br/>
                <label htmlFor="about">About you and your pooch </label>
                <textArea className="about" onChange={this.aboutYou.bind(this)}></textArea>
              </div>
              <div>
                <h2 htmlFor= "header">Dog Profile</h2>
                <div className="imgPreview">
                  {$imagePreview}
                </div>
                <label htmlFor="profilePicture">Upload a Profile Picture </label>
                <input className="file" ref="file" type="file" onChange={(e)=>{console.log('!'); this._handleImageChange(e)}} name="file"/><br/>
                <label htmlFor="dogname">Name </label>
                <input className="dogname" type="textbox" onChange={this.dogName.bind(this)}></input>
                <label htmlFor="sex">Sex </label>
                <select className="dropdown" onChange={this.sexSet.bind(this)} value={this.state.sex}>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
                <label htmlFor="age">Age </label>
                <select className="dropdown" onChange={this.ageSet.bind(this)} value={this.state.age}>
                  <option value="Less than 6 months old">Less than 6 months</option>
                  <option value="6-12 months old">6-12 months</option>
                  <option value="1-2 years old">1-2 years</option>
                  <option value="2-4 years old">2-4 years</option>
                  <option value="5-8 years old">5-8 years</option>
                  <option value="9-12 years old">9-12 years</option>
                  <option value="over 12 years old">over 12 years</option>
                </select>
                <label htmlFor="size">Size </label>
                <select className="dropdown" onChange={this.sizeSet.bind(this)} value={this.state.size}>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
                <label htmlFor="breed">Breed </label>
                <input className="breed" type="textbox" onChange={this.setBreed.bind(this)}></input><br/>
                <label htmlFor="energylevel">Energy Level</label>
                <select className="dropdown" onChange={this.energylevelSet.bind(this)} value={this.state.energylevel}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <label>
                  Vaccinations up to date 
                  <input
                    name="vaccs"
                    type="checkbox"
                    checked={this.state.vaccinations}
                    onChange={this.vacChange.bind(this)} />
                </label>
                <label>
                  Spayed or Neutered 
                  <input
                    name="sterile"
                    type="checkbox"
                    checked={this.state.sterile}
                    onChange={this.sterileChange.bind(this)} />
                </label>
                <label htmlFor="anything">Anything else? </label>
                <textArea className="anything" onChange={this.anySet.bind(this)}></textArea>
              </div>
              </form> 
              <button className="button" onClick={this.submitProfile.bind(this)}>Submit</button>
        </div>
      );
    }
}