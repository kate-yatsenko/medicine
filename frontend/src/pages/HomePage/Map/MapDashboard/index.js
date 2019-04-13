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
    const {search, filter, places, gmaps} = this.props;
    return (
      <div>
        <PlacesSearch {...search} {...gmaps} />
        <PlacesFilter {...filter} />
        <PlacesList places={places} map={gmaps.map}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDashboard);
