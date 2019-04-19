import React from 'react';
import { Badge, Icon } from 'antd';
import ChatFrameMessages from './ChatFrameMessages';
import ChatMessageInput from './ChatMessageInput';

import './style.scss';

const ChatCurrent = () => {
  return (
    <div className="chat-current">
      <div className="chat-current-title">
        <Icon type="arrow-left" className="chat-current-back d-md-none"/>
        <Badge status="success" text="Вася"/>
      </div>
      <ChatFrameMessages/>
      <ChatMessageInput/>
    </div>
  );
};

export default ChatCurrent;
