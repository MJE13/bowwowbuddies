// import React, { Component } from 'react'
// import logo from './logo.svg';
// import './App.css';
// import $ from 'jquery';
// import MessagePane from './MessagePane'

// export default class Messages extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       from: "",
//       to: "",
//       text: "",
//       user1:"",
//       user2:"",
//       messages : []
//     };
//   }

//   componentWillMount(){
//     setInterval(this.recieveMessage.bind(this), 3000)
//   }

//   fromSet(event) {
//     this.setState({from: event.target.value});
//   }
//   toSet(event){
//     this.setState({to: event.target.value});
//   }
//   textSet(event) {
//     this.setState({text: event.target.value});
//   }
//   user1Set(event) {
//     this.setState({user1: event.target.value});
//   }
//   user2Set(event) {
//     this.setState({user2: event.target.value});
//   }

//   submitMessage(){
//     $.ajax({
//         method: 'POST', 
//         url:'http://localhost:3001/api/messages',
//         contentType: 'application/json',
//         data: JSON.stringify({
//             from: this.state.from,
//             to: this.state.to,
//             text: this.state.text
//           })
//     })
//       .done((result) => {
//         //self.recieveMessage()
//         console.log(result) 
//     }) 
//   }

// recieveMessage(){

//   var self = this
//   $.get('http://localhost:3001/api/messages', 
//         {user1: this.state.user1, user2: this.state.user2}, 
//         function(response){ 
//             self.setState({messages : response})
//         })
// }

//     render() {
//       return (
//         <div>
//         <div className="App">
//         <h2>HMU</h2>
//           <div className="App-header">
//             <img src={logo} className="App-logo" alt="logo"/>
//           </div>
//           <div>
//             <label htmlFor="from">From:</label>
//             <input className="from" type="textbox" onChange={this.fromSet.bind(this)}></input>
//             <label htmlFor="to">   To:</label>
//             <input className="to" type="textbox" onChange={this.toSet.bind(this)}></input> <br/>
//             <br/><textArea className="Message" placeholder="Enter Message (bark)" onChange={this.textSet.bind(this)}></textArea><br/>
//             <button onClick={this.submitMessage.bind(this)}>Submit</button><br/> <br/>
//           </div>
//           <div>
//             <label htmlFor="user1">User1:</label>
//             <input className="user1" type="textbox" onChange={this.user1Set.bind(this)}></input>
//             <label htmlFor="user2">    User2:</label>
//             <input className="user2" type="textbox" onChange={this.user2Set.bind(this)}></input>
//             <button onClick={this.recieveMessage.bind(this)}>Refresh</button>
//             <MessagePane messages={this.state.messages} />
//           </div>
//         </div>
//         </div>
//       );
//     }
// }