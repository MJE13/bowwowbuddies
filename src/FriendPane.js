import React, { Component } from 'react';


export default class FriendPane extends Component {
  render(){ 
    const {username, imgURL, about, dogname, sex, sterile, vaccinations, 
    	age, size, breed, energylevel, anything} 
          = this.props.profile 
    return (<div>
              <div>
              <img src={imgURL} />
                'Username: '{username} 
                {about}
                'Dog Name: '{dogname}
                {sex}
                {sterile}
                {vaccinations}
                'Age: '{age}
                {size}
                {breed}
                {energylevel}
                {anything}
              </div>            
            </div>)
  }
}