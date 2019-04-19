import React from 'react';
import { Badge, Typography } from 'antd';
import { socket } from 'pages/ChatPage';
import { connect } from 'react-redux';

import './style.scss';

const mapStateToProps = ({ chatState }) => {
  return {
    chatsStatus: chatState.chatsStatus
  }
};

const { Text } = Typography;

class ChatList extends React.Component {

  chooseChat = (id) => {
    socket.emit('history', id);
  };

  render() {
    const { chatsStatus } = this.props;
    return (
      <div className="chat-list">
        {chatsStatus.map(item =>
          <div
            className="chat-list-item d-flex justify-content-between"
            onClick={() => this.chooseChat(item.sender)}
            key={item.sender}
          >
            <Text>{item.name}</Text>
            <Badge count={item.unread}/>
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ChatList);
