import React, { Component } from 'react';


export default class HomePane extends Component {
  render(){ 
    const {username, imgURL} = this.props.profile 
    return (<div>
              <div>
              	<h2 className="username">
                	{username}
                </h2>
              </div>
              <div>
                <img src={imgURL} />
              </div>            
            </div>)
  }
}