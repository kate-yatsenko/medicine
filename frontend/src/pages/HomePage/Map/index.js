import React, { Component } from 'react';
import MapDashboard from './MapDashboard';
import MapLayout from './MapLayout';

export default class Map extends Component {
  render() {
    return (
      <div className="map">
        <div className="map-dashboard" style={{
          width: '300px',
          float: 'left',
        }}>
          <MapDashboard />
        </div>
        <div style={{
          // width: '200px',
          float: 'left',
        }}>
          <MapLayout />
        </div>
      </div>     
    );
  }
}
