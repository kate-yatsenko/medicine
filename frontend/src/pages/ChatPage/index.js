import React from 'react';
import Helmet from 'react-helmet';
import Chat from './Chat'

class ChatPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet title="Chat"/>
        <Chat/>
      </React.Fragment>
    );
  }
}

export default ChatPage;