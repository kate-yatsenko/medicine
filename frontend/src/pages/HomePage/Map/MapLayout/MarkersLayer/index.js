import React, { Component } from 'react';
import MedicMarker from './MedicMarker'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Alert} from 'antd';
import * as mapActions from 'actions/mapActions';

import './style.css';

const mapStateToProps = ({mapState}) => {
  return {...mapState};
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(mapActions, dispatch);
}

class MarkersLayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      places: [],
    }
  }
  static counter = 0;

  getMarkersList({placesArray, activePlaceId}) {
    return placesArray.map((place) => {
      const placeId = place.placeId;
      const active = (placeId === activePlaceId);
      return (
        <MedicMarker 
          className={active ? "map-marker-active" : ""}
          key={placeId} 
          place={place}
          icon="\images\map-marker-health.png"
          zIndex={1}
        />);
    })
  }
  getAlertsList(messages, type) {
    return messages.map((message) => (
      <Alert 
        className="map-alert" 
        key={MarkersLayer.counter++} 
        message={message} 
        type={type} 
        showIcon 
        closable 
      />
    ))
  }

  componentDidUpdate() {
    const {map, zoom} = this.props.gmaps;
    if (!map) {
      return;
    }
    const {placesArray, activePlaceId} = this.props.places;
    let centerLocation;
    if (activePlaceId) {
      centerLocation = placesArray.find((place) => {
        if (place.placeId === activePlaceId) {
          return true;
        }
        return false;
      }).location;
    } else {
      centerLocation = this.props.search.position;
    }
    if (centerLocation) {
      map.panTo(centerLocation);
    }
    map.setZoom(zoom);
  }

  render() {
        // TODO: render MarkersLayer if exists mapState.search.position/mapState.places
    const {places, search, gmaps} = this.props;
    const {position: location, adress, alerts, errors} = search;
    return (
      <div className="markers-layer">
        {places.placesArray.length && this.getMarkersList(places)}
        { location &&
          <MedicMarker 
            place={{
              location, 
              name: "центр пошуку",
              adress,
              type: 'searchPosition',
              tags: [],
            }}
            icon="\images\map-marker-user.png"
            zIndex={2}
          />
        }
        {gmaps.loadingMessage && this.getAlertsList([gmaps.loadingMessage], 'info')}
        {alerts.length && this.getAlertsList(alerts, 'warning')}
        {errors.length && this.getAlertsList(errors, 'error')}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkersLayer);
