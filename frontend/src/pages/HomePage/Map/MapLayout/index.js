import React, { Component } from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import { connect } from 'react-redux';
import MarkersLayer from './MarkersLayer'
import AlertsLayer from './AlertsLayer'
import * as mapActions from 'actions/mapActions';
import {bindActionCreators} from 'redux';
import apiKey from 'data/apiKey'

// const mapDispatchToProps = (dispatch) => {
//   return {
//     initMapServices: (map, placesService) => {
//       dispatch(initMapServices(map, placesService));
//     },
//     getLocation: (geocoderService, placesService) => {
//       dispatch(getLocation(geocoderService, placesService));
//     },
//     searchPlaces: (geocoderService, placesService) => {
//       dispatch(searchPlaces(geocoderService, placesService));
//     },
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(mapActions, dispatch);
}

class MapLayout extends Component {
  static libraries = ['places'];

  onMapLoad = map => {
    const {initMapServices, getLocation} = this.props;
    const placesService = new window.google.maps.places.PlacesService(map);
    const geocoderService = new window.google.maps.Geocoder();
    initMapServices({map, geocoderService, placesService});
    getLocation(geocoderService, placesService);
  }

  render() {
    // TODO: get position from navigator
    const zoom = 13;
    const position = {lat: 49.430, lng: 32.075};

    return (
      <LoadScript
        id='script-loader'
        googleMapsApiKey={apiKey}
        version='weekly'
        libraries={MapLayout.libraries}
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
          <MarkersLayer position={position} />
          <AlertsLayer />
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default connect(null, mapDispatchToProps)(MapLayout);
