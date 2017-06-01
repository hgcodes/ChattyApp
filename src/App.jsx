import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      messages: []
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.setNewUsername = this.setNewUsername.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = (message) => {
      const incomingObj = JSON.parse(message.data);
      let notices = [];
      notices = this.state.messages.concat(incomingObj);
      this.setState({ messages: notices });
    };

    this.socket.onopen = function(event) {
      console.log('Connected to Server');
    };
  }

  newNotification(note) {
    const notification = {
      type: "postNotification",
      content: note
    }
    this.socket.send(JSON.stringify(notification));
    console.log("Notification: ", notification);
  }


  setNewUsername(oldUsername, newUsername) {
    this.setState({ username: newUsername });
    this.newNotification(`${oldUsername || 'Unknown'} changed their username to ${newUsername}`)
    // notice that we now have a new username!  what a joy!
  }

  addNewMessage(content) {
    const message = {
      username: this.state.username,
      content: content,
      type: "postMessage"
    };
    this.socket.send(JSON.stringify(message));
  }

  render() {
    return (
      <div className='messagecontainer'>
          <nav className='navbar'>
            <a href='/' className='navbar-brand'>Chatty</a>
          </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar username={ this.state.username}
          newUsername={ this.setNewUsername }
          newMessage={ this.addNewMessage }/>
      </div>
    );
  }
}

export default App;
