import React, { Component } from 'react';
import MedicMarker from './MedicMarker'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Alert} from 'antd';
import * as mapActions from 'actions/mapActions';

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

  getMarkersList(places) {
    return places.map((place) => {
      return (
        <MedicMarker 
          key={place.placeId} 
          place={place}
          icon="\images\map-marker-health.png"
          zIndex={1}
        />);
    })
  }
  getAlertsList(messages, type) {
    return messages.map((message) => (
      <Alert key={MarkersLayer.counter++} message={message} type={type} showIcon closable 
        style={{
          backgroundColor: 'hsla(33, 50%, 75%, 0.8)',
          margin: '5px',
          position: 'relative',
          top: '30px',
          width: '50%',
        }}
      />
    ))
  }

  componentDidUpdate() {
    const position = (this.props.filter.selectedPlace && this.props.filter.selectedPlace.position) 
      || this.props.search.position;
    if (this.props.gmaps.map && position) {
      this.props.gmaps.map.panTo(position);
    }
  }

  render() {
        // TODO: render MarkersLayer if exists mapState.search.position/mapState.places
    const {places, search} = this.props;
    const {position: location, adress, alerts, errors} = search;
    return (
      <div className="markers-layer">
        {places.length && this.getMarkersList(places)}
        { location &&
          <MedicMarker 
            place={{
              location, 
              name: "центр пошуку",
              adress,
              type: 'searchPosition',
              tags: [],
            }}
            // position={position} 
            // name="центр пошуку"
            // adress={adress}
            // types={['searchPosition']}
            icon="\images\map-marker-user.png"
            zIndex={2}
          />
        }
        {alerts.length && this.getAlertsList(alerts, 'warning')}
        {errors.length && this.getAlertsList(errors, 'error')}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkersLayer);
