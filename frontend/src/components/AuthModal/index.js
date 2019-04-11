import React from 'react';
import { Modal, Tabs } from 'antd';
import { connect } from 'react-redux';
import { toggleAuthModalVisible } from '../../actions/authActions';
import LoginTab from './LoginTab';
import SignUpTap from './SignUpTap';

const TabPane = Tabs.TabPane;

function mapStateToProps({ authState }) {
  return {
    showAuthModal: authState.showAuthModal
  };
}

class AuthModal extends React.Component {

  render() {
    const { showAuthModal, dispatch } = this.props;
    return (
      <Modal
        visible={showAuthModal}
        onCancel={() => dispatch(toggleAuthModalVisible())}
        footer={null}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Логін" key="1">
            <LoginTab/>
          </TabPane>
          <TabPane tab="Реєстрація" key="2">
            <SignUpTap/>
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(AuthModal);
