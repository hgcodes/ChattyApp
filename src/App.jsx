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

  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //     const messages = this.state.messages.concat(newMessage)
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: messages})
  //   }, 3000);
  // }

  addNewMessage(name, content) {
    const message = {
      id: this.state.messages.length + 1,
      username: name,
      content
    };
    const newMessages = this.state.messages.concat(message);
    this.setState({messages: newMessages});
  }

  render() {
    return (
      <div className='messagecontainer'>
          <nav className='navbar'>
            <a href='/' className='navbar-brand'>Chatty</a>
          </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar user={ this.state.currentUser.name } newMessage={ this.addNewMessage }/>
      </div>
    );
  }
}

export default App;

