import React, { Component } from 'react';


export default class SearchPane extends Component {

  render(){ 
    return (<div> {this.props.userlist.map(user => <User user={user}/>)}</div>) //takes each user object in the userlist array, maps them to user component
  }
}

class User extends Component{
  render(){
    const {dogname, breed, address, imgURL} = this.props.user //these are constant properties of the user
    return (<div>
              <div>
                  <img src={imgURL} />
                 {dogname} the {breed} is waiting for friends at {address}
              </div>            
            </div>)
  }
}