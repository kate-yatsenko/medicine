import React from 'react';
import { Layout, Row, Col, notification } from 'antd';
import ChatMessages from './ChatMessages';
import ChatCurrent from './ChatCurrent';
import { updateChatHistory, updateChatsStatus, updateReadMessages, updateNewMessages } from 'actions/chatActions';
import { socket } from '../../ChatPage';
import { connect } from 'react-redux';

const { Content } = Layout;

const mapStateToProps = ({ chatState, patientState }) => {
  return {
    chatHistory: chatState.chatHistory,
    currentCompanion: chatState.currentCompanion,
    testId: patientState.testId,
  }
};

class Chat extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;

    socket.emit('status');

    socket.on('status', chatsStatus => {
      dispatch(updateChatsStatus(chatsStatus.bySender, chatsStatus.total));
    });

    socket.on('history', chatHistory => {
      console.log(chatHistory);
      dispatch(updateChatHistory(chatHistory, chatHistory.slice(-100)));
      this.scrollDown();
      setTimeout(() => this.readMessages(), 1000);
    });

    socket.on('message', (message, meta) => {
      console.log(message, meta);
      const { testId, currentCompanion } = this.props;
      if (testId !== meta.sender) {
        socket.emit('status');
        const args = {
          message: 'Нове повідомлення',
          description: message,
        };
        notification.open(args);
      }
      if (currentCompanion) {
        if (currentCompanion.sender === meta.sender || testId === meta.sender) {
          const { dispatch } = this.props;
          dispatch(updateNewMessages({ ...meta, message }));
          this.scrollDown();
        }
        if (currentCompanion.sender === meta.sender) {
          setTimeout(() => socket.emit('read', [meta.id]), 1000);
        }
      }
    });

    socket.on('processing', message => {
      // console.log(message)
    });

    socket.on('read', read => {
      const { dispatch } = this.props;
      dispatch(updateReadMessages(read));
      console.log(read, 'read');
      socket.emit('status');
    });

    socket.on('error', error => {
      console.log(error);
    });
  }

  readMessages = () => {
    const { currentCompanion, chatHistory } = this.props;
    const unreadMessages = chatHistory.filter(message => !message.isRead && message.sender === currentCompanion.sender);
    let unreadMessagesIds = [];
    unreadMessages.forEach(item => {
      unreadMessagesIds.push(item.id)
    });
    if (unreadMessagesIds.length) {
      socket.emit('read', unreadMessagesIds);
    }
  };

  scrollDown = () => {
    const block = document.querySelector('.chat-frame-messages');
    block.scrollTop = block.scrollHeight;
  };

  render() {
    return (
      <Content className="page">
        <Row>
          <Col xs={24} sm={10} md={7}>
            <ChatMessages/>
          </Col>
          <Col xs={24} sm={14} md={17}>
            <ChatCurrent/>
          </Col>
        </Row>
      </Content>
    );
  }
}

export default connect(mapStateToProps)(Chat);
