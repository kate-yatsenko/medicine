import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PlacesFilter from './PlacesFilter';
import PlacesSearch from './PlacesSearch';
import PlacesList from './PlacesList';
import mapActions from 'actions/mapActions';

const mapStateToProps = ({mapState}) => {
  return {...mapState};
}

const mapDispatchToProps = {
  onCategoryChange: mapActions.selectPlace,
}

class MapDashboard extends Component {
  render() {
    const {search, places, gmaps} = this.props;
    return (
      <div>
        <PlacesSearch {...search} {...gmaps} />
        <PlacesFilter {...this.props} />
        <PlacesList {...places} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDashboard);