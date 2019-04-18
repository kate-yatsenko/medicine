import React, { Component } from 'react';
import {List, Alert } from 'antd';
import { selectPlace } from '../../../../../actions/mapActions';

export default class PlacesList extends Component {

  onItemClick = (placeId) => {
    this.props.selectPlace(placeId);
  }
  getPlacesList = ({placeId, location, name, adress, type, tags, rating}) => {
    return (
      <List.Item 
        key={placeId} 
        style={{cursor:'pointer',}}
        onClick={() => {
          this.onItemClick(placeId, location, this.props.map)}}
      >
        {name}
        {placeId === this.props.places.activePlaceId &&
          <div style={{paddingLeft: '10px', fontStyle: 'italic', width: '250px'}}>
            {adress}<br />
            {type}<br />
            {tags.join(', ')}<br />
            {`рейтинг: ${rating.value?rating.value:'-'}/5 (відгуків - ${rating.users?rating.users:0})`}
          </div>
        }
      </List.Item>
    )
  }

  render() {
    const {placesArray, activePlaceId} = this.props.places;
    return (
      <div style={{overflow: 'auto', height:'400px'}}>
      <List
          size="small"
          bordered
          dataSource={placesArray}
          renderItem={this.getPlacesList}
      />
      </div>
    );
  }
};
