import React, { Component } from 'react';
import {browserHistory} from 'react-router';


var nameStyle = {
  color: 'mediumorchid'
}

export default class SentMessagePane extends Component {

  filterMessages(startArr, messages){
    var user= messages[0].username
    var userArr = messages.filter(function(message, user){
      return message.username === user
    })
    userArr.sort(function(a,b){
      return a.date
    })
    messages.filter(function(message){

    })
  }

  // componentWillReceiveProps(){
  //   this.setState({markTrue : this.props.markTrue})
  // }

  render(){ 
    return (<div> {this.props.messages.map(message => <Message key={message._id} theKey={message._id} message={message} 
                //markTrue={this.state.markTrue}
                />)} </div>) // takes each component of the messages array and it is assigning it as a message component
  }
}

class Message extends Component{ //the is the class that is created on line 10


  messageBuddy() {
    var self = this
    // self.props.markTrue(self.props.theKey)
    var username = self.props.message.from
    browserHistory.push('/Friend/'+ username)

  }
  render(){
    return (<div>
              <span style={nameStyle}> {this.props.message.from}: </span> 
                 {this.props.message.text.join(' ')} {/*not quite sure wtf message.text.join does*/}
                 <button className="button" onClick={this.messageBuddy.bind(this)}> Reply </button><br/>
            </div>)
  }
}