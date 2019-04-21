import React from 'react';
import { Modal, Steps } from 'antd';
import { connect } from 'react-redux';
import { toggleAuthModalVisible, updateUserInfo, changeStep } from 'actions/authActions';
import { GoogleLogin } from 'react-google-login';
import SignUpTap from './SignUpTap';
import { authUser } from 'api';
import { Base64 } from 'js-base64';

import './style.scss';

const Step = Steps.Step;

function mapStateToProps({ authState }) {
  return {
    showAuthModal: authState.showAuthModal,
    token: authState.token,
    step: authState.step,
  };
}

class AuthModal extends React.Component {

  componentDidMount() {
    const { token, dispatch } = this.props;
    if (token) {
      dispatch(changeStep(1));
    }
  }

  responseGoogle = (response) => {
    const { dispatch } = this.props;
    authUser(response.tokenId)
      .then(data => {
        const base64Url = data.token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const userData = JSON.parse(Base64.decode(base64));
        dispatch(updateUserInfo({
          userId: userData.id,
          userRole: userData.roleId,
          isProfileComplete: data.isProfileComplete,
          token: data.token,
          userName: userData.name,
          userEmail: userData.email
        }));
        const isProfileComplete = data.isProfileComplete ? 'true' : '';

        localStorage.setItem('userId', userData.id);
        localStorage.setItem('userRole', userData.roleId);
        localStorage.setItem('isProfileComplete', isProfileComplete);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userEmail', userData.email);
        if (data.isProfileComplete) {
          dispatch(toggleAuthModalVisible());
        } else {
          dispatch(changeStep(1));
        }
      });
  };

  renderSwitch(step) {
    switch (step) {
      case 0:
        return (
          <div className="d-flex justify-content-center">
            <GoogleLogin
              clientId="221104242047-rpltkon7lq56n218k6b8sl4jt639h3mq.apps.googleusercontent.com"
              buttonText="Логін"
              onSuccess={this.responseGoogle}
            />
          </div>
        );
      case 1:
        return (
          <SignUpTap/>
        );
      default:
        return null
    }
  };

  render() {
    const { showAuthModal, dispatch, step } = this.props;

    return (
      <Modal
        visible={showAuthModal}
        onCancel={() => dispatch(toggleAuthModalVisible())}
        footer={null}
        title="Авторизація"
      >
        <Steps current={step} size="small">
          <Step title="Google логін"/>
          <Step title="Заповнення персональної інформації"/>
        </Steps>
        <div className="auth-modal">
          {this.renderSwitch(step)}
        </div>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(AuthModal);
