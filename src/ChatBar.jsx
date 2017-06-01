import React, {Component} from 'react';

class ChatBar extends Component {

constructor(props) {
  super(props);

  this.state = {
    // username: this.props.username,
    username: '',
    message: ''
  }

  this.onNameChange = this.onNameChange.bind(this);
  this.onContentChange = this.onContentChange.bind(this);
  this.onMessageKeyDown = this.onMessageKeyDown.bind(this);
  this.onUsernameKeyDown = this.onUsernameKeyDown.bind(this);
}

onNameChange(event) {
  this.setState({username: event.target.value});
}

onContentChange(event) {
  this.setState({message: event.target.value});
}

onUsernameKeyDown(event) {
  if (event.charCode == 13) {
    this.props.newUsername(this.state.username);
  }
}

onUsernameBlur = (e) => {
  this.props.newUsername(this.state.username);
}

onMessageKeyDown(event) {
  if (event.charCode == 13) {
    this.props.newMessage(this.state.message);
    this.setState({message: ''});
  }
}

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={ this.state.username }
          onChange={ this.onNameChange }
          onKeyPress= {this.onUsernameKeyDown }
          onBlur= {this.onUsernameBlur}
          />
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={ this.state.message }
          onChange={ this.onContentChange }
          onKeyPress={ this.onMessageKeyDown } />
      </footer>
    );
  }
}

export default ChatBar;
