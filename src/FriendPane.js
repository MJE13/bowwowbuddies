import React, { Component } from 'react';
import {browserHistory} from 'react-router'
export default class FriendPane extends Component {
  render(){ 
    const {imgURL, username, about, dogname, sex, sterile, vaccinations, 
        age, size, breed, energylevel, anything} 
          = this.props.profile 
    return (<div>
              <div>
                <h2 className="username">
                  {username} 
                </h2>
              <img className="friendprofilepic" src={imgURL} /> <br/>

                
                About: {about} <br/>
                Dog Name: {dogname} <br/>
                Sex: {sex} <br/>
                Spayed or Neutered: {sterile} <br/>
                Vaccinations up to date: {vaccinations}<br/>
                Age: {age}<br/>
                Size: {size}<br/>
                Breed: {breed} <br/>
                Energy Level: {energylevel} <br/>
                Anything else: {anything} <br/>
              </div>            
            </div>)
  }
}