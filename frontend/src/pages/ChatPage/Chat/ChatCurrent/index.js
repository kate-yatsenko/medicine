import React from 'react';
import ChatFrameMessages from './ChatFrameMessages';
import ChatMessageInput from './ChatMessageInput';
import ChatUserName from './ChatUserName';
import { clearChatHistory } from 'actions/chatActions';
import { connect } from 'react-redux';
import { Typography } from 'antd';

import './style.scss';

const { Text } = Typography;

const mapStateToProps = ({ chatState }) => {
  return {
    currentCompanion: chatState.currentCompanion,
  }
};

class ChatCurrent extends React.Component {

  closeChat = () => {
    const { dispatch } = this.props;
    dispatch(clearChatHistory());
  };

  render() {
    const { currentCompanion } = this.props;

    return currentCompanion ? (
      <div className="chat-current">
        <ChatUserName closeChat={this.closeChat} name={currentCompanion.name}/>
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
