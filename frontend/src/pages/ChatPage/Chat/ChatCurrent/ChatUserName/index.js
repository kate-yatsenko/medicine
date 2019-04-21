import React from 'react';
import { Typography, Icon } from 'antd';

const { Text } = Typography;

const ChatUserTitle = ({ name, closeChat }) => {
  return (
    <div className="chat-current-title d-flex justify-content-between">
      <Text>{name}</Text>
      <Icon type="close" className="chat-current-close" onClick={closeChat}/>
    </div>
  );
};

export default ChatUserTitle;
