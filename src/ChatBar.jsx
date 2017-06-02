import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      message: ''
    }
  }
  // Allows username to be changed by user
  onNameChange = (event) => {
    this.setState({username: event.target.value});
  }
  // Allows message field to be changed by user
  onContentChange = (event) => {
    this.setState({message: event.target.value});
  }
  // Updates username field when changed by user
  onUsernameChanged = (event) => {
    if (event.type === 'blur' || event.key && event.charCode === 13) {
      if(this.props.username !== this.state.username) {
        this.props.newUsername(this.props.username, this.state.username);
      }
    }
  }
  // Resets message field to empty when user hits 'return' key
  onMessageKeyDown = (event) => {
    if (event.charCode === 13) {
      this.props.newMessage(this.state.message);
      this.setState({message: ''});
    }
  }
  // Renders username and message
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={ this.state.username } onChange={ this.onNameChange } onKeyPress= {this.onUsernameChanged } onBlur= {this.onUsernameChanged}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={ this.state.message } onChange={ this.onContentChange } onKeyPress={ this.onMessageKeyDown } />
      </footer>
    );
  }
}

export default ChatBar;
