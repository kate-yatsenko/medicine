import React from 'react';
import { Button, Tooltip, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.scss';

const mapStateToProps = ({ chatState, authState }) => {
  return {
    totalMessages: chatState.totalMessages,
    currentCompanion: authState.currentCompanion,
    token: authState.token,
  }
};


const ButtonCommunication = ({ totalMessages, token, currentCompanion }) => {
  return token ? (
    <Link to="/chat">
      <div className="fixed-button">
        <Badge count={currentCompanion ? Number(totalMessages) - currentCompanion.unread : Number(totalMessages)} overflowCount={99}>
          <Tooltip placement="top" title="Відкрити чат">
            <Button shape="circle" icon="mail"/>
          </Tooltip>
        </Badge>
      </div>
    </Link>
  ) : null
};
export default connect(mapStateToProps)(ButtonCommunication);
