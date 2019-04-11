import React, { Component } from 'react';
import MedicMarker from './MedicMarker'
import {searchPlaces} from '../api/google-api'

export default class MarkersLayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      places: [],
    }
    // debugger;
    this.firstPlacesSearch();
  }

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

  // componentDidMount() {
  //   if (!this.state.places.length) {
  //     // debugger;
  //     this.firstPlacesSearch();
  //   }
  // }

  render() {
    return (
      <div className="markers-layer">
        {this.state.places.length && this.getMarkersList(this.state.places)}
      </div>
    )
  }
}
