import React from 'react';
import { Typography, Icon } from 'antd';
import moment from 'moment';
import 'moment/locale/uk';
import { connect } from 'react-redux';

import './style.scss';

const { Text } = Typography;

const mapStateToProps = ({ chatState }) => {
  return {
    currentChatHistory: chatState.currentChatHistory
  }
};

class ChatFrameMessages extends React.Component {

  render() {
    const { currentChatHistory } = this.props;
    console.log(currentChatHistory, 'current');

    return (
      <div className="chat-frame-messages d-flex flex-column">
        {currentChatHistory.map(item => {
            const ownMessageClass = item.sender === 3 ? " chat-frame-messages-item-own" : "";
            return (
              <div className={"chat-frame-messages-item" + ownMessageClass} key={item.id}>
                <Text>{item.message}</Text>
                <div className="chat-frame-messages-time-block">
                  {moment(item.created).locale('uk').calendar()}
                  {item.isRead && item.sender === 3 && (
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
