import React, { Component } from 'react';
import './App.css';


export default class HomePane extends Component {
  render(){ 
    const {username, dogname, imgURL} = this.props.profile 
    return (<div>
              <div>
              	<h2 className="header">
                	{username} & {dogname}
                </h2>
              </div>
              <div>
                <img className="homepagepic" src={imgURL} />
              </div>            
            </div>)
  }
}