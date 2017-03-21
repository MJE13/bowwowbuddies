import React, { Component } from 'react';
import {browserHistory} from 'react-router';


var nameStyle = {
  color: 'green'
}

export default class SentMessagePane extends Component {

  render(){ 
    return (<div> {this.props.messages.map(message => <Message key={message._id} message={message}/>)}</div>) // takes each component of the messages array and it is assigning it as a message component
  }
}

class Message extends Component{ //the is the class that is created on line 10
  messageBuddy() {
    console.log(this.props)
    var username = this.props.message.from
    browserHistory.push('/Friend/'+ username)
  }
  render(){
    return (<div>
              <span style={nameStyle}> {this.props.message.from} :</span> 
                 {this.props.message.text.join(' ')} {/*not quite sure wtf message.text.join does*/}
                 <button onClick={this.messageBuddy.bind(this)}> Reply </button><br/>
            </div>)
  }
}