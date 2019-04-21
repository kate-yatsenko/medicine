import React from 'react';
import ChatList from './ChatList';

import './style.scss';

const ChatMessages = () => {
  return (
    <div className="chat-messages">
      <ChatList/>
    </div>
  );
};

export default ChatMessages;
