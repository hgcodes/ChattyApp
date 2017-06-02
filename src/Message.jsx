import React, {Component} from "react";

class Message extends Component {
  get MessageClass() {
    switch(this.props.type) {
      case "incomingMessage": return "message";
      case "incomingNotification": return "notification";
      // Changes message type based on whether it is notification or message
    }
  }

  render() {
    return (
      <div className={this.messageClass} >
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}

export default Message;
