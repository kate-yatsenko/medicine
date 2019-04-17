import React from 'react';
import { Button, Tooltip, Badge } from 'antd';
import { Link } from 'react-router-dom';
import './style.scss';

const ButtonCommunication = () => {
  return (
    <Link to="/chat">
      <div className="fixed-button">
        <Badge count={1000} overflowCount={999}>
          <Tooltip placement="top" title="Відкрити чат">
            <Button shape="circle" icon="mail"/>
          </Tooltip>
        </Badge>
      </div>
    </Link>
  );
};
export default ButtonCommunication;
