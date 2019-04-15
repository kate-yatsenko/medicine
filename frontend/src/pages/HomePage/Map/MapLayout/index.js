import React, { Component } from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import { connect } from 'react-redux';
import MarkersLayer from './MarkersLayer'
import mapActions from 'actions/mapActions';

import apiKey from 'data/apiKey'

const mapDispatchToProps = (dispatch) => {
  return {
    initMapServices: (map, placesService) => {
      dispatch(mapActions.initMapServices(map, placesService));
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
            height: "100vh",
            width: "100%",
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
          language="uk"
          region="UA"
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
