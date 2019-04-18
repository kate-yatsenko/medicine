import React, { Component } from 'react';
import {List} from 'antd';

export default class PlacesList extends Component {

  getPlacesList = ({placeId, name, adress, type, tags, rating}) => {
    return (
      <List.Item 
        key={placeId} 
        style={{cursor:'pointer',}}
        onClick={() => {
          this.props.selectPlace({activePlaceId: placeId, zoom: this.props.map.getZoom})}}
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
