import React, { Component } from 'react';
import {browserHistory} from 'react-router';


export default class SearchPane extends Component {
  render(){ 
    return (<div> {this.props.userlist.map(user => <User user={user}/>)}</div>) //takes each user object in the userlist array, maps them to user component
  }
}

class User extends Component{
  findBuddy() {
    var username = this.props.user.username
    browserHistory.push('/Friend/'+ username)
  }
  render(){
    const {dogname, breed, address, imgURL} = this.props.user //these are constant properties of the user
    return (<div>
              <div>
                  <img className="SearchPhoto" src={imgURL} /> <br/>
                 {dogname} the {breed} is waiting for friends at {address}<br/>
                 <button onClick={this.findBuddy.bind(this)}> View Profile</button><br/>
              </div>            
            </div>)
  }
}