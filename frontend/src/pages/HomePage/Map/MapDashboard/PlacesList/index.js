import React, { Component } from 'react';
import {List} from 'antd';

export default class PlacesList extends Component {

  toggleSelectPlace = (placeId) => {
    const zoom = this.props.map.getZoom();
    const prevActivePlaceId = this.props.places.activePlaceId;
    const activePlaceId = prevActivePlaceId !== placeId ? placeId : prevActivePlaceId ? null : placeId;
    this.props.selectPlace({activePlaceId, zoom});
  }
  getPlacesList = ({placeId, name, adress, type, tags, rating, ratingUsers}) => {
    return (
      <List.Item 
        key={placeId} 
        style={{cursor:'pointer',}}
        onClick={() => this.toggleSelectPlace(placeId)}
      >
        <div className="map-places-list-item">
          {name}
          {placeId === this.props.places.activePlaceId &&
            <div style={{paddingLeft: '10px', fontStyle: 'italic', width: '250px'}}>
              {adress}<br />
              {type}<br />
              {tags.join(', ')}<br />
              {`рейтинг: ${rating?rating:'-'}/5 (відгуків - ${ratingUsers?ratingUsers:0})`}
            </div>
          }
        </div>
      </List.Item>
    )
  }

  render() {
    return (
      <div style={{overflow: 'auto', height:'400px'}}>
      <List
          size="small"
          bordered
          dataSource={this.props.places.placesArray}
          renderItem={this.getPlacesList}
      />
      </div>
    );
  }
};
