import React, { Component } from 'react';
import './App.css';

var nameStyle = {
  color: 'mediumorchid'
}

export default class MessagePane extends Component {

  render(){ 
    return (<div> {this.props.messages.map(message => <Message key={message._id} message={message}/>)}</div>) // takes each component of the messages array and it is assigning it as a message component
  }
}

class Message extends Component{ //the is the class that is created on line 10
  render(){
    return (<div className = "wrap">
              <article>
              <span style={nameStyle}> {this.props.message.from} :</span> 
                 {this.props.message.text.join(' ')} {/*not quite sure wtf message.text.join does*/}
              </article>
            </div>)
  }
}