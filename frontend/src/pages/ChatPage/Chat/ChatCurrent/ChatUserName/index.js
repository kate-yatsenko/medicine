import React from 'react';
import { Typography, Icon } from 'antd';

const { Text } = Typography;

const ChatUserTitle = ({ name }) => {
  return (
    <div className="chat-current-title">
      <Icon type="arrow-left" className="chat-current-back d-md-none"/>
      <Text>{name}</Text>
    </div>
  );
};

export default ChatUserTitle;
