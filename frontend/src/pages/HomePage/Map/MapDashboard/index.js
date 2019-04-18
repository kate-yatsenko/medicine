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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(mapActions, dispatch);
}

class MapDashboard extends Component {
  render() {
    const {search, filter, places, gmaps, endSearchPosition, searchPlaces, getLocation, selectPlace} = this.props;
    return (
      <div>
        <PlacesSearch {...search} {...gmaps} getLocation={getLocation} endSearchPosition={endSearchPosition} searchPlaces={searchPlaces} />
        <PlacesFilter {...filter} />
        <PlacesList places={places} selectPlace={selectPlace}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDashboard);
