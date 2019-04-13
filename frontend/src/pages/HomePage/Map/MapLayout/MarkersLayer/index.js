import React, { Component } from 'react';
import MedicMarker from './MedicMarker'
import {searchPlaces} from 'api/google-api'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mapActions from 'actions/mapActions';

const mapStateToProps = ({mapState}) => {
  return {...mapState};
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(mapActions, dispatch);
}

class MarkersLayer extends Component {
  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     places: [],
  //   }
  //   // debugger;
  //   this.firstPlacesSearch();
  // }

  firstPlacesSearch = () => {
    // debugger;
    searchPlaces(window.placesService, this.props.position, 1000,)
      .then((result) => {
        this.setState(() => {
          return {places: result.places};
        });
      })
  }

  getMarkersList(places) {
    return places.map((place) => {
      const {place_id, geometry, name, vicinity, types} = place;
      return (
        <MedicMarker 
          key={place_id} 
          position={geometry.location} 
          name={name}
          adress={vicinity}
          types={types}
        />);
    })
  }

  render() {
    return (
      <div className="markers-layer">
        {this.props.places.length && this.getMarkersList(this.props.places)}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkersLayer);