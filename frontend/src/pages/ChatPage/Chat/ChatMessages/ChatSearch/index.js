import React from 'react';
import { Input } from 'antd';

import './style.scss';

const ChatSearch = () => {
  return (
    <div className="chat-search">
      <Input
        placeholder="Пошук чату"
        allowClear
      />
    </div>
  );
};

export default ChatSearch;
