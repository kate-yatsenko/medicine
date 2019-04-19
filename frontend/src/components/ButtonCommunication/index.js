import React from 'react';
import { Button, Tooltip, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.scss';

const mapStateToProps = ({ chatState }) => {
  return {
    totalMessages: chatState.totalMessages
  }
};


const ButtonCommunication = ({ totalMessages }) => {
  return (
    <Link to="/chat">
      <div className="fixed-button">
        <Badge count={Number(totalMessages)} overflowCount={99}>
          <Tooltip placement="top" title="Відкрити чат">
            <Button shape="circle" icon="mail"/>
          </Tooltip>
        </Badge>
      </div>
    </Link>
  );
};
export default connect(mapStateToProps)(ButtonCommunication);
