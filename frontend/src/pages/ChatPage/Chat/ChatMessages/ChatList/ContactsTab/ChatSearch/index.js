import React from 'react';
import { Input } from 'antd';

import './style.scss';

const ChatSearch = ({ searchUser }) => {
  return (
    <div className="chat-search">
      <Input
        onChange={(e) => searchUser(e.target.value)}
        placeholder="Пошук контакту"
        allowClear
      />
    </div>
  );
};

export default ChatSearch;
