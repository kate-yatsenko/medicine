import React from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { toggleUpdateModalVisible } from 'actions/authActions';
import UpdateProfile from './UpdateProfile';

function mapStateToProps({ authState }) {
  return {
    showUpdateModal: authState.showUpdateModal,
  };
}

class UpdateProfileModal extends React.Component {

  render() {
    const { showUpdateModal, dispatch } = this.props;

    return (
      <Modal
        visible={showUpdateModal}
        onCancel={() => dispatch(toggleUpdateModalVisible())}
        footer={null}
        title="Редагування профілю"
      >
        <div className="auth-modal">
          <UpdateProfile/>
        </div>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(UpdateProfileModal);
