import React, { Component } from 'react';
import MapDashboard from './MapDashboard';
import MapLayout from './MapLayout';
import { Row, Col } from 'antd';

export default class Map extends Component {
  render() {
    return (
      <Row type="flex" justify="space-around">
      <Col span={6} > 
       <MapDashboard />
      </Col>
      <Col span={17}>
      <MapLayout /></Col>
    </Row>
     
    );
  }
}
