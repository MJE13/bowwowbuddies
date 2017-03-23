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
    const {username, age, dogname, sex, breed, imgURL} = this.props.user //these are constant properties of the user
    return (<div>
              <h2 className="header">
                {username} & {dogname}
              </h2>
              <div>
                <img className="SearchPhoto" src={imgURL} /> <br/>
                <div>
                  Dog Name: {dogname} <br/>
                  Sex: {sex} <br/>
                  Age: {age}<br/>
                  Breed: {breed} <br/>
                  <button className="button" onClick={this.findBuddy.bind(this)}> View Profile</button><br/>
                </div>
              </div>         
            </div>)
  }
}

