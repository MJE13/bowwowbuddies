import React, { Component } from 'react';
import {browserHistory} from 'react-router';


var nameStyle = {
  color: 'mediumorchid'
}

export default class SentMessagePane extends Component {

  render(){ 
    return (<div> {this.props.messages.map(message => <Message key={message._id} message={message}/>)}</div>) // takes each component of the messages array and it is assigning it as a message component
  }
}

class Message extends Component{ //the is the class that is created on line 10
  messageBuddy() {
    var self = this
    var username = this.props.message.from
    browserHistory.push('/Friend/'+ username)
    self.props.message.setState({received: true})

  }
  render(){
    return (<div>
              <span style={nameStyle}> {this.props.message.from}: </span> 
                 {this.props.message.text.join(' ')} {/*not quite sure wtf message.text.join does*/}
                 <button className="button" onClick={this.messageBuddy.bind(this)}> Reply </button><br/>
            </div>)
  }
}