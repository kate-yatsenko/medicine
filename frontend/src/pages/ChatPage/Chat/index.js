import React from 'react';
import { Layout, Row, Col } from 'antd';
import ChatMessages from './ChatMessages';
import ChatCurrent from './ChatCurrent';
import { updateChatHistory, updateChatsStatus, updateCurrentChatHistory } from 'actions/chatActions';
import { socket } from '../../ChatPage';
import { connect } from 'react-redux';

const { Content } = Layout;

class Chat extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    socket.emit('status');
    socket.on('status', chatsStatus => {
      console.log(chatsStatus);
      dispatch(updateChatsStatus(chatsStatus.bySender, chatsStatus.total));
    });
    socket.on('history', chatHistory => {
      console.log(chatHistory);
      dispatch(updateChatHistory(chatHistory));
      dispatch(updateCurrentChatHistory(chatHistory.slice(-100)));
      const block = document.querySelector('.chat-frame-messages');
      block.scrollTop = block.scrollHeight;
    });
  }

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

export default connect()(Chat);
