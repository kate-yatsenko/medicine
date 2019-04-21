import React, { Component } from 'react';
import MapDashboard from './MapDashboard';
import MapLayout from './MapLayout';

import './style.css';

export default class Map extends Component {
  render() {
    return (
      <div className="map" stype={{position: 'relative'}}>
        <MapDashboard />
        <MapLayout />
      </div>     
    );
  }
}
