import React from 'react';
import { Typography, Badge } from "antd";

const { Text } = Typography;

const ChatsTab = ({ chatsStatus, chooseChat }) => {
  return (
    <div className="chat-list">
      {chatsStatus.map(item =>
        <div
          className="chat-list-item d-flex justify-content-between"
          onClick={() => chooseChat(item)}
          key={item.sender}
        >
          <Text>{item.name}</Text>
          <Badge count={item.unread} overflowCount={99}/>
        </div>
      )}
    </div>
  );
};

export default ChatsTab;
