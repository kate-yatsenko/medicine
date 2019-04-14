import React from 'react';
import { Layout, Typography } from 'antd';
import { toggleAuthModalVisible } from 'actions/authActions';
import { connect } from 'react-redux';
import AuthModal from '../AuthModal';
import './style.scss';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const { Text } = Typography;

const TopMenu = ({ dispatch }) => {
  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
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
            className="top-menu-office"
          >
            <Text
              type="secondary"
            >
              Мій кабінет (Лікар)
            </Text>
          </Link>
          <Link
            to="/patient"
            className="top-menu-office"
          >
            <Text
              type="secondary"
            >
              Мій кабінет (Пацієнт)
            </Text>
          </Link>
          <Text
            type="secondary"
            className="top-menu-auth"
            onClick={() => dispatch(toggleAuthModalVisible())}
          >
            Логін | Реєстрація
          </Text>
        </div>
      </div>
      <AuthModal/>
    </Header>
  );
};

export default connect()(TopMenu);
