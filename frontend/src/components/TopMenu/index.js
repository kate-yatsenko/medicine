import React from 'react';
import { Layout, Typography, Icon } from 'antd';
import { toggleAuthModalVisible, logoutUser, toggleUpdateModalVisible,removeProfileData } from 'actions/authActions';
import { clearChat } from 'actions/chatActions';
import AuthModal from '../AuthModal';
import UpdateProfileModal from '../UpdateProfileModal';
import './style.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const { Header } = Layout;
const { Text } = Typography;

function mapStateToProps({ authState }) {
  return {
    userRole: authState.userRole,
    token: authState.token,
    isProfileComplete: authState.isProfileComplete,
  };
}

class TopMenu extends React.Component {

  logoutAndClearChat = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
    dispatch(clearChat());
    dispatch(removeProfileData());
  };

  render() {
    const { dispatch, userRole, token, isProfileComplete } = this.props;
    return (
      <Header
        style={{
          position: 'fixed',
          zIndex: 1000,
          width: '100%',
          backgroundColor: '#f0f2f5'
        }}
      >
        <div className="d-flex justify-content-between">
          <Link to="/">
            <img
              className="top-menu-logo"
              src="/images/menu-logo.png"
              alt="logo"
            />
          </Link>
          <div className="top-menu">
            {userRole === 2 &&
            <React.Fragment>
              <Link
                to="/doctor"
                className="top-menu-office d-none d-md-inline-block"
              >
                <Text
                  type="secondary"
                >
                  Мій кабінет
                </Text>
              </Link>
              <Link
                to="/doctor"
                className="top-menu-office d-md-none"
              >
                <Icon type="user"/>
              </Link>
            </React.Fragment>
            }
            {userRole === 1 &&
            <React.Fragment>
              <Link
                to="/patient"
                className="top-menu-office d-none d-md-inline-block"
              >
                <Text
                  type="secondary"
                >
                  Мій кабінет
                </Text>
              </Link>
              <Link
                to="/patient"
                className="top-menu-office d-md-none"
              >
                <Icon type="user"/>
              </Link>
            </React.Fragment>
            }
            {isProfileComplete
              ? (
                <React.Fragment>
                  <Text
                    type="secondary"
                    className="top-menu-auth  d-none d-md-inline-block"
                    onClick={() => dispatch(toggleUpdateModalVisible())}
                  >
                    Редагування профілю
                  </Text>
                  <Icon
                    type="edit"
                    className="top-menu-auth d-md-none"
                    onClick={() => dispatch(toggleUpdateModalVisible())}
                  />
                </React.Fragment>
              )
              : (
                <React.Fragment>
                  <Text
                    type="secondary"
                    className="top-menu-auth  d-none d-md-inline-block"
                    onClick={() => dispatch(toggleAuthModalVisible())}
                  >
                    {Boolean(token) ? "Заповнити профіль" : "Авторизація"}
                  </Text>
                  <Icon
                    type="unlock"
                    className="top-menu-auth d-md-none"
                    onClick={() => dispatch(toggleAuthModalVisible())}
                  />
                </React.Fragment>
              )}
            {Boolean(token) && (
              <React.Fragment>
                <Text
                  type="secondary"
                  className="top-menu-auth d-none d-md-inline-block"
                  onClick={this.logoutAndClearChat}
                >
                  Вийти з профіля
                </Text>
                <Icon
                  type="lock"
                  className="top-menu-auth d-md-none"
                  onClick={this.logoutAndClearChat}
                />
              </React.Fragment>
            )}
          </div>
        </div>
        <UpdateProfileModal/>
        <AuthModal/>
      </Header>
    );
  }
}

export default connect(mapStateToProps)(TopMenu);
