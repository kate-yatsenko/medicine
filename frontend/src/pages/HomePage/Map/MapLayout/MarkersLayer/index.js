import React, { Component } from 'react';
import MedicMarker from './MedicMarker'
import {searchMedicPlaces} from 'api/google-api'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapActions from 'actions/mapActions';

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
    // debugger;
    this.firstPlacesSearch();
  }

  firstPlacesSearch = () => {
    // debugger;
    const {gmaps, search, searchPlaces} = this.props;
    const {position, radius} = search;
    searchMedicPlaces(gmaps.placesService, position, radius)
      .then((result) => {
        searchPlaces(result);
      });
  }

  getMarkersList(places) {
    // debugger;
    return places.map((place) => {
      const {placeId, location, name, adress, type, tags, rating} = place;
      
      return (
        <MedicMarker 
          key={placeId} 
          position={location} 
          name={name}
          adress={adress}
          type={type}
          tagss={tags}
          rating={rating}
          // TODO: custom icons by type
          icon="\images\map-marker-health.png"
          zIndex={1}
        />);
    })
  }

  componentDidMount() {
    this.props.gmaps.map.panTo(this.props.search.position);
  }

  render() {
    const {places, search} = this.props;
    const {position, adress} = search;
    // debugger;
    return (
      <div className="markers-layer">
        {places.length && this.getMarkersList(places)}
        <MedicMarker 
          position={position} 
          name="центр пошуку"
          adress={adress}
          types={['searchPosition']}
          icon="\images\map-marker-user.png"
          zIndex={2}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkersLayer);
