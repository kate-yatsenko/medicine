import React, { Component } from 'react';
import MapDashboard from './MapDashboard';
import MapLayout from './MapLayout';
import { relative } from 'path';
import { AutoComplete } from 'antd';

export default class Map extends Component {
  render() {
    return (
      <div className="map" stype={{position: relative}}>
        <div className="map-dashboard" style={{
          width: '300px',
          position: 'fixed',
        }}>
          <MapDashboard />
        </div>
        <div className="map-layout" style={{
          marginLeft: '300px',
        }}>
          <MapLayout />
        </div>
      </div>     
    );
  }
}
