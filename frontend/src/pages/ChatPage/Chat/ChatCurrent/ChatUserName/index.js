import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const ChatUserTitle = ({ name }) => {
  return (
    <div className="chat-current-title">
      <Text>{name}</Text>
    </div>
  );
};

export default ChatUserTitle;
