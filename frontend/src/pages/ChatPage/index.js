import React from 'react';
import Helmet from 'react-helmet';
import Chat from './Chat'


const ChatPage = (props) => {
  return (
    <React.Fragment>
      <Helmet title="Chat"/>
      <Chat {...props} />
    </React.Fragment>
  );
};

export default ChatPage;