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
        <form ref="uploadForm" className="uploader" onSubmit={(e)=> e.preventDefault()} encType="multipart/form-data">
          <div className="UserProfile">
            <h2 className="OwnerProfile" htmlFor="headProfile">Owner Profile</h2>
              <ul className="flex-outer">
                <li>
                  <label htmlFor="user">Create a Username</label>
                  <input className="user" type="textbox" onChange={this.userName.bind(this)}></input><br/>
                </li>
                <li>
                  <label htmlFor="password">Create a Password</label>
                  <input className="password" type="password" onChange={this.passWord.bind(this)}></input><br/>
                </li>
                <li>
                  <label htmlFor="address">Address</label>
                  <input className="address" type="textbox" onChange={this.addRess.bind(this)}></input><br/>
                </li>
                <li>
                  <label htmlFor="about">About you</label>
                  </li>
                  <li className="flex-inner">
                  <textArea onChange={this.aboutYou.bind(this)}></textArea>
                </li>
              </ul>
          </div>  
        </form>

          <div className="UserProfile">
            <div className="DogProfile">
              <div className="flex-outer">
                <form>
                  <h2 htmlFor= "headProfile">Dog Profile</h2>
                    <ul class="flex-outer">
                      <li>
                        <label htmlFor="dogname">Name</label>
                        <input className="dogname" type="textbox" onChange={this.dogName.bind(this)}></input>
                      </li>
                      <li>
                        <label htmlFor="breed">Breed</label>
                        <input className="breed" type="textbox" onChange={this.setBreed.bind(this)}></input><br/>
                      </li>
                  </ul>
              </form>
          </div>
          <div className="flex-outer">
              <ul className="flex-inner">
                <li className="flex-inner">
                  <label htmlFor="age">Age</label>
                    <select className="age" onChange={this.ageSet.bind(this)} value={this.state.age}>
                      <option value="0-6 mo">Less than 6 months</option>
                      <option value="6-12 mo">6-12 months</option>
                      <option value="1-2">1-2 years</option>
                      <option value="2-4">2-4 years</option>
                      <option value="5-8">5-8 years</option>
                      <option value="9-12">9-12 years</option>
                      <option value=">12">over 12 years</option>
                    </select>
                </li>
                    <li className="flex-inner">
                    <label for="size">Size</label>
                      <select className="size" onChange={this.sizeSet.bind(this)} value={this.state.size}>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </li>
              </ul>
                <ul className="flex-inner">
                  <li>
                    <label htmlFor="sex">Sex</label>
                      <select className="sex" onChange={this.sexSet.bind(this)} value={this.state.sex}>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </select>
                      </li>
                      <li className="flex-inner">
                      <label htmlFor="energylevel">Energy Level</label>
                      <select className="energylevel" onChange={this.energylevelSet.bind(this)} value={this.state.energylevel}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                  </li>
                </ul>
          </div>
          <div className="imgPreview">
            {$imagePreview}
          </div>
          <label htmlFor="profilePicture">Upload a Profile Picture </label>
          <input className="file" ref="file" type="file" onChange={(e)=>{console.log('!'); this._handleImageChange(e)}} name="file"/><br/>
            
          <div className="flex-outer">
            <ul className="flex-inner">
              <li className="flex-inner">
                <input
                  name="vaccs"
                  type="checkbox"
                  checked={this.state.vaccinations}
                  onChange={this.vacChange.bind(this)} />
                <label> Vaccinated</label>
                </li>
                <li className="flex-inner">
                <input
                  name="sterile"
                  type="checkbox"
                  checked={this.state.sterile}
                  onChange={this.sterileChange.bind(this)} />
                <label> Spayed / Nuetered</label>
                </li>
            </ul>
          </div>
            <div className="flex-outer">
              <textArea placeholder="Anything else?" onChange={this.anySet.bind(this)}></textArea>
            </div>
            <button className="button" onClick={this.submitProfile.bind(this)}>submit</button>
          </div>
              </div>
        </div>
      );
    }
  }