import React from 'react';
import { Typography } from 'antd';

import './style.scss';

const { Text } = Typography;

const ChatFrameMessages = () => {
  return (
    <div className="chat-frame-messages d-flex flex-column">
      <div className="chat-frame-messages-item">
        <Text>Ant Design</Text>
      </div>
      <div className="chat-frame-messages-item">
        <Text>Ant Design</Text>
      </div>
      <div className="chat-frame-messages-item chat-frame-messages-item-own">
        <Text>Ant Design</Text>
      </div>
      <div className="chat-frame-messages-item">
        <Text>Ant Design</Text>
      </div>
      <div className="chat-frame-messages-item chat-frame-messages-item-own">
        <Text>Ant Design</Text>
      </div>
      <div className="chat-frame-messages-item">
        <Text>Ant Design</Text>
      </div>

    </div>
  );
};

export default ChatFrameMessages;
