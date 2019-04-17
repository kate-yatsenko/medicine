import React from 'react';
import { Input } from 'antd';

import './style.scss';

const ChatMessageInput = () => {
  return (
    <div className="chat-message-input">
      <Input placeholder="Ваше повідомлення"/>
    </div>
  );
};

export default ChatMessageInput;
