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
    map.setZoom(zoom);
    if (centerLocation) {
      map.panTo(centerLocation);
    }
  }

  render() {
    const {places, search} = this.props;
    const {position: location, adress} = search;
    return (
      <div className="markers-layer">
        {places.placesArray.length && this.getMarkersList(places)}
        {location &&
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
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkersLayer);
