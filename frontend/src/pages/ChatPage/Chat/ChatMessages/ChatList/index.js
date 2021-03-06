import React from 'react';
import { Tabs } from 'antd';
import { socket } from 'App';
import { connect } from 'react-redux';
import { updateCurrentCompanion } from 'actions/chatActions';
import ChatsTab from './ChatsTab';
import ContactsTab from './ContactsTab';

import './style.scss';

const mapStateToProps = ({ chatState }) => {
  return {
    chatsStatus: chatState.chatsStatus,
    chatHistory: chatState.chatHistory,
    currentCompanion: chatState.currentCompanion,
  }
};

const TabPane = Tabs.TabPane;

class ChatList extends React.Component {
  state = {
    activeKey: "1",
  };

  chooseChat = (item) => {
    const { dispatch } = this.props;
    socket.socket.emit('history', item.sender);
    dispatch(updateCurrentCompanion(item));
  };

  chooseTab = (activeKey) => {
    this.setState({ activeKey });
  };

  render() {
    const { chatsStatus, currentCompanion } = this.props;
    const { activeKey } = this.state;

    return (
      <Tabs activeKey={activeKey} onChange={this.chooseTab}>
        <TabPane tab="Контакти" key="1">
          <ContactsTab
            chooseTab={this.chooseTab}
            chooseChat={this.chooseChat}
            chatsStatus={chatsStatus}
          />
        </TabPane>
        <TabPane tab="Чати" key="2">
          <ChatsTab
            currentCompanion={currentCompanion}
            chooseChat={this.chooseChat}
            chatsStatus={chatsStatus}
          />
        </TabPane>
      </Tabs>
    )
  }
}

export default connect(mapStateToProps)(ChatList);
