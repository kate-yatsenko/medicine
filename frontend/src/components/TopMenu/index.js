import React from 'react';
import { Layout, Typography, Icon } from 'antd';
import { toggleAuthModalVisible } from 'actions/authActions';
import AuthModal from '../AuthModal';
import './style.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const { Header } = Layout;
const { Text } = Typography;

const TopMenu = ({ dispatch }) => {
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
          <Link
            to="/doctor"
            className="top-menu-office d-none d-md-inline-block"
          >
            <Text
              type="secondary"
            >
              Мій кабінет (Лікар)
            </Text>
          </Link>
          <Link
            to="/doctor"
            className="top-menu-office d-md-none"
          >
            <Icon type="user"/>
          </Link>
          <Link
            to="/patient"
            className="top-menu-office d-none d-md-inline-block"
          >
            <Text
              type="secondary"
            >
              Мій кабінет (Пацієнт)
            </Text>
          </Link>
          <Link
            to="/patient"
            className="top-menu-office d-md-none"
          >
            <Icon type="user"/>
          </Link>
          <Text
            type="secondary"
            className="top-menu-auth d-none d-md-inline-block"
            onClick={() => dispatch(toggleAuthModalVisible())}
          >
            Логін | Реєстрація
          </Text>
          <Icon
            type="unlock"
            className="top-menu-auth d-md-none"
            onClick={() => dispatch(toggleAuthModalVisible())}
          />
        </div>
      </div>
      <AuthModal/>
    </Header>
  );
};

export default connect()(TopMenu);
