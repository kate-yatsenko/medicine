import React from 'react';
import { Layout, Typography  } from 'antd';
import './style.scss';

const { Header } = Layout;
const { Text } = Typography;

const TopMenu = () => {
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
        <img
          className="logo"
          src="/images/menu-logo.png"
          alt="logo"
        />
        <Text type="secondary">Логін | Реєстрація</Text>
      </div>
    </Header>
  );
};

export default TopMenu;
