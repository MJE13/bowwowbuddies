import React, { Component } from 'react';
import {browserHistory} from 'react-router';
var nameStyle = {
  color: 'mediumorchid'
}
export default class SentMessagePane extends Component {
  constructor(props){
    super(props)
    this.state = {
      messArr: [],
    };
  }
  componentWillReceiveProps(nextProps){
    console.log('running componentWillReceiveProps')
    console.log(nextProps)
    var filteredArray = this.filterMessages(nextProps.messages, this.state.messArr)
    this.setState({messArr: filteredArray})
  }
  filterMessages(messages, startArr){
    console.log('running filterMessages')
    if (messages.length===0) {
      return startArr;
    }
    var user = messages[0].from
    var userArr = messages.filter(function(message){
      console.log(message.from)
      return message.from === user
    })
    console.log(userArr)
    console.log("after filter")
    userArr.sort(function(a,b){
      var aDate=new Date(a.date)
      var bDate=new Date(b.date)
      console.log(aDate.getTime())
      console.log(bDate.getTime())
      return (aDate.getTime()>bDate.getTime())
    })
    console.log(userArr)
    console.log("after date sort")
    var oneMess = startArr
    oneMess.push(userArr[0])
    var newArr = messages.filter(function(message){
      return message.from !== user
    })
    console.log(oneMess)
    console.log(newArr)
    return this.filterMessages(newArr, oneMess)
  }
  render(){ 
    console.log('rendering')
    return (<div> {this.state.messArr.map(message => <Message key={message._id} message={message}/>)}</div>) // takes each component of the messages array and it is assigning it as a message component
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