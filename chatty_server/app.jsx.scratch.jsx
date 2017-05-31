import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.addNewMessage = this.addNewMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
//new code
    function connectionEstablished() {
      console.log('connectionEstablished');

      $('#typehere').on('input', function(e) {
        const content = $(this).val():
        ws.send(content);
      });
    }

// new code


    this.socket.onmessage = function(message) {
      console.log('Received message from server:', message);// new line of code
      console.log(message.data); // new line of code
      $('#typehere').val(message.data); // new line of code
    };

    this.socket.onopen = () => {
      console.log('Connected to Server');
    };
  }

  addNewMessage(name, content) {
    const message = {
      id: this.state.messages.length + 1,
      username: name,
      content: content
    };
    this.socket.send(JSON.stringify(message));

    console.log(message);
    const newMessages = this.state.messages.concat(message);
    this.setState({messages: newMessages});
  }

  render() {
    return (
      <div className='messagecontainer'>
          <nav className='navbar'>
            <a href='/' className='navbar-brand'>Chatty</a>
          </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar user={ this.state.currentUser.name } newMessage={ this.addNewMessage }/>
      </div>
    );
  }
}

export default App;
