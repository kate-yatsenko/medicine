import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapMarker from './MapMarker'

const mapStateToProps = ({mapState:
  {
    gmaps: {map, zoom},
    places: {placesArray, activePlaceId},
    search: {type, position, adress}
  }
}) => {
  return ({
      map,
      zoom,
      placesArray,
      activePlaceId,
      type,
      position,
      adress,
  });
}

class MarkersLayer extends Component {
  getMarkersList() {
    const {placesArray, activePlaceId, type} = this.props;
    return placesArray.map((place) => {
      const placeId = place.placeId;
      const active = (placeId === activePlaceId);
      return (
        <MapMarker 
          key={placeId} 
          place={place}
          type={type}
          active={active}
        />);
    })
  }
  componentDidUpdate() {
    const {map, zoom, position, placesArray, activePlaceId} = this.props;
    if (!map) {
      return;
    }
    let mapCenter;
    if (activePlaceId) {
      mapCenter = placesArray.find((place) => {
        if (place.placeId === activePlaceId) {
          return true;
        }
        return false;
      }).position;
    } else {
      mapCenter = position;
    }
    map.setZoom(zoom);
    if (mapCenter) {
      map.panTo(mapCenter);
    }
  }

  render() {
    const {position, adress, placesArray} = this.props;
    return (
      <div className="markers-layer">
        {placesArray.length && this.getMarkersList()}
        {position &&
          <MapMarker 
            place={{
              position,
              adress,
              name: "Цент пошуку",
              rating: false,
            }}
            type="USER"
          />
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(MarkersLayer);
