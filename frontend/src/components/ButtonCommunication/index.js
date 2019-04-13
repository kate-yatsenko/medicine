import React from 'react';
import { Icon, Tooltip } from 'antd';
import './style.scss';

const ButtonCommunication = () => {
  return (
    <div className='fixed-button'>
      <Tooltip placement="top" title="Відкрити чат">
        <Icon type="message"/>
      </Tooltip>
    </div>
  );
};
export default ButtonCommunication;
