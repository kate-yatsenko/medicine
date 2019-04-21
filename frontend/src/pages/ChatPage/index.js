import React from 'react';
import Helmet from 'react-helmet';
import Chat from './Chat'
import socketIOClient from "socket.io-client";

let socket;

class ChatPage extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: process.env.REACT_APP_API_CHAT_URL,
    };

    socket = socketIOClient(this.state.endpoint, {
      transportOptions: {
        polling: {
          extraHeaders: {
            'x-id': 3,
          }
        }
      }
    });
  }

  componentDidCatch(er) {
    console.log(er);
  }

  render() {
    return (
      <React.Fragment>
        <Helmet title="Chat"/>
        <Chat/>
      </React.Fragment>
    );
  }
}

export {socket, ChatPage};