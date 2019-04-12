import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chatActions from 'actions/chatActions';
import Helmet from 'react-helmet';
import Chat from './Chat'

function mapStateToProps({ chatState }) {
  return { ...chatState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...chatActions,
  }, dispatch);
}

const ChatPage = (props) => {
  return (
    <React.Fragment>
      <Helmet title="Chat"/>
      <Chat {...props} />
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);