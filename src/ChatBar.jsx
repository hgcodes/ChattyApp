import React, {Component} from 'react';

class ChatBar extends Component {

constructor(props) {
  super(props);
  this.state = {
    username: '',
    message: '',
    note: ''
  }
  this.onNameChange = this.onNameChange.bind(this);
  this.onContentChange = this.onContentChange.bind(this);
}

onNameChange(event) {
  this.setState({username: event.target.value});
}

onContentChange(event) {
  this.setState({message: event.target.value});
}

onUsernameChanged = (event) => {
  if (event.type === 'blur' || (event.key && event.charCode == 13)) {
    if(this.props.username !== this.state.username) {
      this.props.newUsername(this.props.username, this.state.username);
    }
  }
}

onMessageKeyDown = (event) => {
  if (event.charCode == 13) {
    this.props.newMessage(this.state.message);
    this.setState({message: ''});
  }
}

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
