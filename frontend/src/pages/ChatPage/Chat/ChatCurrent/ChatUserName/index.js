import React from 'react';
import { Badge, Icon } from 'antd';

const ChatUserTitle = () => {
  return (
    <div className="chat-current-title">
      <Icon type="arrow-left" className="chat-current-back d-md-none"/>
      <Badge status="success" text="Вася"/>
    </div>
  );
};

export default ChatUserTitle;
