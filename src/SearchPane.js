import React, { Component } from 'react';


export default class SearchPane extends Component {

  render(){ 
    return (<div> {this.props.userlist.map(user => <User user={user}/>)}</div>)
  }
}

class User extends Component{
  render(){
    return (<div>
              <div>
                {this.state.props.userlist} 
              </div>            
            </div>)
  }
}