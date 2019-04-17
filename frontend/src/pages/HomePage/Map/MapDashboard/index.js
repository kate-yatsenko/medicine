import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PlacesFilter from './PlacesFilter';
import PlacesSearch from './PlacesSearch';
import PlacesList from './PlacesList';
import * as mapActions from 'actions/mapActions';


const mapStateToProps = ({mapState}) => {
  return {...mapState};
}



const mapDispatchToProps = {
  onFilterByName: mapActions.filterByNameChange,
  onCategoryChange: mapActions.filterByCategoryChange
}

class MapDashboard extends Component {
  state = {
    currentLatLng: {
      lat: 0,
      lng: 0
    }
  };
  getGeoLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
              this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              })
            }
          )
        } 
      }

  render() {
    const {search, filterByCategory, filterByName, places, gmaps} = this.props;
    const visiblePlaces = places.filter(place =>
      place.name.toLowerCase().includes(filterByName),
    );
    return (
      <div style={{paddingTop: "20px"}}>
        <h4 style={{marginBottom: "20px", textAlign: "center" }}> Пошукова панель</h4>
        <PlacesSearch {...search} {...gmaps} getGeoLocation={this.getGeoLocation}/>
        <PlacesFilter {...filterByCategory} {...this.props} />
        <PlacesList places={visiblePlaces} map={gmaps.map}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDashboard);
