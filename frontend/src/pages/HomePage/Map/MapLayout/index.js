import React, { Component } from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MarkersLayer from './MarkersLayer'
import {initMapServices} from 'actions/mapActions';

import apiKey from 'data/apiKey'

const mapDispatchToProps = (dispatch) => {
  return {
    initMapServices: (map, placesService) => {
      dispatch(initMapServices(map, placesService));
    }
  }
}

class MapLayout extends Component {
  state = {
    googleApiLoaded: false,
  }

  onMapLoad = map => {
    const placesService = new window.google.maps.places.PlacesService(map);
    this.props.initMapServices(map, placesService);
    this.setState(() => {
      return {mapServicesInited: true};
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
            height: "1000px",
          }}
          zoom={zoom}
          center={position}
          options={{
            clickableIcons: false,
            controlSize: 24,
          }}
          onLoad={(map) => {
            this.onMapLoad(map);
          }}
        >
          {this.state.mapServicesInited &&
            <MarkersLayer position={position} />
          }
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default connect(null, mapDispatchToProps)(MapLayout);
