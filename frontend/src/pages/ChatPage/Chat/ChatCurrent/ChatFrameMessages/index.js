import React from 'react';
import { Typography, Icon } from 'antd';
import moment from 'moment';
import 'moment/locale/uk';
import { connect } from 'react-redux';

import './style.scss';

const { Text } = Typography;

const mapStateToProps = ({ chatState, authState }) => {
  return {
    currentChatHistory: chatState.currentChatHistory,
    userId: authState.userId
  }
};

class ChatFrameMessages extends React.Component {

  render() {
    const { currentChatHistory, userId } = this.props;

    return (
      <div className="chat-frame-messages d-flex flex-column">
        {currentChatHistory.map(item => {
            const ownMessageClass = item.sender === userId ? " chat-frame-messages-item-own" : "";
            return (
              <div className={"chat-frame-messages-item" + ownMessageClass} key={item.id}>
                <Text>{item.message}</Text>
                <div className="chat-frame-messages-time-block">
                  {moment(item.created).locale('uk').calendar()}
                  {item.isRead && item.sender === userId && (
                    <Icon type="check" className="chat-frame-messages-icon"/>
                  )}
                </div>
              </div>
            )
          }
        )}
      </div>
    )
  }
};

export default connect(mapStateToProps)(ChatFrameMessages);
