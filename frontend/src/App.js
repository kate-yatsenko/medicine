import React from 'react';
import routes from './routes';
import TopMenu from 'components/TopMenu';
import { Layout, notification } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import Socket from 'helpers/Socket';
import { updateChatHistory, updateChatsStatus, updateReadMessages, updateNewMessages } from 'actions/chatActions';
import { logoutUser } from "actions/authActions";

const mapStateToProps = ({ authState, chatState }) => {
  return {
    userId: authState.userId,
    token: authState.token,
    currentCompanion: chatState.currentCompanion,
    chatHistory: chatState.chatHistory,
  }
};

let socket;

class App extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    axios.interceptors.response.use(response => {
      return response
    }, err => {
      if (err.response.status === 401) {
        dispatch(logoutUser())
      }
      return Promise.reject(err)
    });
  }

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      this.initChat();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      if (this.props.token) {
        this.initChat();
      } else {
        socket.socket.emit('disconnect');
      }
    }
  }

  readMessages = () => {
    const { currentCompanion, chatHistory } = this.props;
    const unreadMessages = chatHistory.filter(message => !message.isRead && message.sender === currentCompanion.sender);
    let unreadMessagesIds = [];
    unreadMessages.forEach(item => {
      unreadMessagesIds.push(item.id)
    });
      socket.socket.emit('read', unreadMessagesIds);
  };

  scrollDown = () => {
    const block = document.querySelector('.chat-frame-messages');
    block.scrollTop = block.scrollHeight;
  };

  initChat = () => {
    const { dispatch, token } = this.props;

    socket = new Socket(token);

    socket.socket.emit('status');

    socket.socket.on('status', chatsStatus => {
      dispatch(updateChatsStatus(chatsStatus.bySender, chatsStatus.total));
    });

    socket.socket.on('history', chatHistory => {
      dispatch(updateChatHistory(chatHistory, chatHistory.slice(-100)));
      this.scrollDown();
      this.readMessages();
    });

    socket.socket.on('message', (message, meta) => {
      const { userId, currentCompanion } = this.props;
      socket.socket.emit('status');

      if (userId !== meta.sender) {
        const args = {
          message: 'Нове повідомлення',
          description: message,
        };
        notification.open(args);
      }

      if (currentCompanion) {
        if (currentCompanion.sender === meta.sender || userId === meta.sender) {
          const { dispatch } = this.props;
          dispatch(updateNewMessages({ ...meta, message }));
          this.scrollDown();
        }

        if (currentCompanion.sender === meta.sender) {
          socket.socket.emit('read', [meta.id]);
        }
      }
    });

    socket.socket.on('read', read => {
      const { dispatch } = this.props;
      dispatch(updateReadMessages(read));
      socket.socket.emit('status');
    });

    socket.socket.on('disconnect', error => {
      socket.socket.emit('connect');
    });
  };

  render() {
    return (
      <Layout className="layout">
        <TopMenu/>
        {routes}
      </Layout>
    );
  }
}

const ConnectedApp = connect(mapStateToProps)(App);

export { socket, ConnectedApp };
