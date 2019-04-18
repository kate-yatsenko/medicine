import React from 'react';
import { Badge } from 'antd';

import './style.scss';

const ChatList = () => {
  return (
    <div className="chat-list">
      <div className="chat-list-item d-flex justify-content-between">
        <Badge status="success" text="Вася"/>
        <Badge count={120}/>
      </div>
      <div className="chat-list-item d-flex justify-content-between">
        <Badge status="default" text="Петя"/>
        <Badge count={250}/>
      </div>
      <div className="chat-list-item d-flex justify-content-between">
        <Badge status="default" text="Коля"/>
        <Badge count={300}/>
      </div>
      <div className="chat-list-item d-flex justify-content-between">
        <Badge status="default" text="Степя"/>
        <Badge count={12}/>
      </div>
      <div className="chat-list-item d-flex justify-content-between">
        <Badge status="success" text="Вася"/>
        <Badge count={120}/>
      </div>
      <div className="chat-list-item d-flex justify-content-between">
        <Badge status="default" text="Петя"/>
        <Badge count={250}/>
      </div>
      <div className="chat-list-item d-flex justify-content-between">
        <Badge status="default" text="Коля"/>
        <Badge count={300}/>
      </div>
      <div className="chat-list-item d-flex justify-content-between">
        <Badge status="default" text="Степя"/>
        <Badge count={12}/>
      </div>
      <div className="chat-list-item d-flex justify-content-between">
        <Badge status="success" text="Вася"/>
        <Badge count={120}/>
      </div>
      <div className="chat-list-item d-flex justify-content-between">
        <Badge status="default" text="Петя"/>
        <Badge count={250}/>
      </div>
      <div className="chat-list-item d-flex justify-content-between">
        <Badge status="default" text="Коля"/>
        <Badge count={300}/>
      </div>
      <div className="chat-list-item d-flex justify-content-between">
        <Badge status="default" text="Степя"/>
        <Badge count={12}/>
      </div>
    </div>
  );
};

export default ChatList;
