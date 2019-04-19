import React from 'react';
import ChatFrameMessages from './ChatFrameMessages';
import ChatMessageInput from './ChatMessageInput';
import ChatUserName from './ChatUserName';

import './style.scss';

class ChatCurrent extends React.Component {

  render() {

    return (
      <div className="chat-current">
        <ChatUserName/>
        <ChatFrameMessages/>
        <ChatMessageInput/>
      </div>
    );
  }
}

export default ChatCurrent;
