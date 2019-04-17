import React from 'react';
import ChatSearch from './ChatSearch';
import ChatList from './ChatList';

import './style.scss';

const ChatMessages = () => {
  return (
    <div className="chat-messages">
      <ChatSearch/>
      <ChatList/>
    </div>
  );
};

export default ChatMessages;
