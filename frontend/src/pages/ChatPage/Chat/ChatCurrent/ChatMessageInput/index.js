import React from 'react';
import { Input } from 'antd';
import { socket } from 'pages/ChatPage';

import './style.scss';

class ChatMessageInput extends React.Component {
  state = {
    message: ""
  };

  inputMessage = (message) => {
    this.setState({ message })
  };

  sendMessage = () => {
    const { message } = this.state;
    const { id } = this.props;
    socket.emit('message', {message, id});
    this.setState({ message: "" })
  };

  render() {
    const { message } = this.state;

    return (
      <div className="chat-message-input">
        <Input
          placeholder="Ваше повідомлення"
          allowClear
          onPressEnter={this.sendMessage}
          onChange={(e) => this.inputMessage(e.target.value)}
          value={message}
        />
      </div>
    );
  }
}

export default ChatMessageInput;
