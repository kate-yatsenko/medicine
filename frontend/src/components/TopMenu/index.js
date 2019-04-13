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
            className="logo"
            src="/images/menu-logo.png"
            alt="logo"
          />
        </Link>
        <Text
          type="secondary"
          className="auth"
          onClick={() => dispatch(toggleAuthModalVisible())}
        >
          Логін | Реєстрація
        </Text>
      </div>
      <AuthModal/>
    </Header>
  );
};

export default connect()(TopMenu);
