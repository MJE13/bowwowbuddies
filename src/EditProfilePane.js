import React, { Component } from 'react';


export default class EditProfilePane extends Component {
  render(){ 
    const {username} = this.props.profile 
    return (<div>
              <div>
                {username}
              </div>            
            </div>)
  }
}