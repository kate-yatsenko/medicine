import React, { Component } from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import MarkersLayer from './MarkersLayer'

import apiKey from '../../data/apiKey'

// class GoogleMap


export default class MapLayout extends Component {
  state = {
    googleApiLoaded: false,
  }

  initPlacesService(map) {
    // saving links for gapi objects
    // TODO: move this to storage
    window.map = map;
    window.placesService = new window.google.maps.places.PlacesService(map);
    this.setState(() => {
      // debugger;
      return {googleApiLoaded: true};
    });
  }

  render() {
    // TODO: get position from navigator
    const zoom = 15;
    const position = {lat: 49.430, lng: 32.075};

    return (
      <LoadScript
        id='script-loader'
        googleMapsApiKey={apiKey}
        version='weekly'
        libraries={['places']}
      >
        <GoogleMap
          id="medic-map"
          mapContainerStyle={{
            height: "400px",
            width: "70vw",
          }}
          zoom={zoom}
          center={position}
          options={{
            clickableIcons: false,
            controlSize: 24,
          }}
          onLoad={(map) => {
            this.initPlacesService(map);
          }}
        >
          {this.state.googleApiLoaded &&
            <MarkersLayer position={position} />
          }
        </GoogleMap>
        
        
      </LoadScript>
    )
  }
}
