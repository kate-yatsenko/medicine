import React from 'react';
import { Badge } from 'antd';
import ChatFrameMessages from './ChatFrameMessages';
import ChatMessageInput from './ChatMessageInput';

import './style.scss';

const ChatCurrent = () => {
  return (
    <div className="chat-current">
      <div className="chat-current-title">
        <Badge status="success" text="Вася"/>
      </div>
      <ChatFrameMessages/>
      <ChatMessageInput/>
    </div>
  );
};

export default ChatCurrent;
