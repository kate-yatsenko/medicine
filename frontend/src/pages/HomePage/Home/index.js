import React from 'react';
import { Layout, Icon, Typography } from 'antd';
import './style.scss';

const { Content } = Layout;
const { Text } = Typography;


const Home = () => {
  return (
    <Content className="page">
      <div className="text-center page-home-title">
        <Text type="secondary">
          Високоякісна медицинська платформа
        </Text>
      </div>
      <div className="d-flex flex-wrap justify-content-center page-home-features">
        <div className="page-home-features-item d-flex align-items-center">
          <Icon
            type="check-circle"
            className="d-block"
          />
          <span>Безперервний зв'язок з вашим лікарем</span>
        </div>
        <div className="page-home-features-item d-flex align-items-center">
          <Icon
            type="check-circle"
            className="d-block"
          />
          <span>Зручний функціонал та сучасні медкарти для паціентів</span>
        </div>
        <div className="page-home-features-item d-flex align-items-center">
          <Icon
            type="check-circle"
            className="d-block"
          />
          <span>Пошук найближчих лікарень на карті</span>
        </div>
      </div>
    </Content>
  )
};

export default Home;
