import React from 'react';
import ChatFrameMessages from './ChatFrameMessages';
import ChatMessageInput from './ChatMessageInput';
import ChatUserName from './ChatUserName';
import { connect } from 'react-redux';
import { Typography } from 'antd';

import './style.scss';

const { Text } = Typography;

const mapStateToProps = ({ chatState }) => {
  return {
    currentCompanion: chatState.currentCompanion
  }
};

class ChatCurrent extends React.Component {

  render() {
    const { currentCompanion } = this.props;

    return currentCompanion ? (
      <div className="chat-current">
        <ChatUserName name={currentCompanion.name}/>
        <ChatFrameMessages/>
        <ChatMessageInput id={currentCompanion.sender}/>
      </div>
    ) : (
      <div className="chat-current chat-empty">
        <Text type="secondary" className="chat-empty-text">Оберіть чат</Text>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ChatCurrent);
