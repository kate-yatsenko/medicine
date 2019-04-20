import React, { Component } from 'react';
import {List, Button, Icon, Input} from 'antd';

import './style.css';

const Search = Input.Search;

export default class PlacesList extends Component {
  state = {
    filter: null,
  }

  setFilter = (filter) => this.setState({filter});
  toggleSelectPlace = (placeId) => {
    const zoom = this.props.map.getZoom();
    const prevActivePlaceId = this.props.places.activePlaceId;
    const activePlaceId = prevActivePlaceId !== placeId ? placeId : (prevActivePlaceId ? null : placeId);
    this.props.selectPlace({activePlaceId, zoom});
  };
  getFilteredPlaces = () => {
    const filter = this.state.filter;
    const placesArray = this.props.places.placesArray;
    if (filter) {
      return placesArray.filter(({name}) => {
        const nameLC = name.toLowerCase();
        const filterLC = filter.toLowerCase();
        return nameLC.includes(filterLC);
      });
    }
    return placesArray;
  };
  getPlacesList = ({placeId, name, adress, tags, rating, ratingUsers}) => {
    const {toggleSelectPlace, getTagsList} = this;
    const active = placeId === this.props.places.activePlaceId;
    return (
      <List.Item 
        key={placeId} 
        style={{cursor:'pointer',}}
        onClick={() => toggleSelectPlace(placeId)}
      >
        <div className={active ? "map-places-list-item-active" : "map-places-list-item"}>
          <h1>{name}</h1>
          {active &&
            <div className="place-details">
              <b>Адреса: </b>{adress}<br />
              {!(rating===false) && <span><b>Рейтинг: </b>{rating?rating:'?'}/5 (відгуків - {ratingUsers?ratingUsers:0})</span>}
              {tags && <React.Fragment><br />{getTagsList(tags)}</React.Fragment>}
            </div>
          }
        </div>
      </List.Item>
    )
  };
  getTagsList(tags) {
    return tags.map((tag) => {
      if (!(tag === 'point_of_interest' || tag === 'establishment')){
        return <span key={tag} className="map-tag" >{tag}</span>;
      }
      return '';
    });
  }

  render() {
    const {getFilteredPlaces, getPlacesList} = this;
    return (
      <div className="map-places-list">
        <Search
        className="map-places-filter"
          placeholder="Фільтр за назвою"
          enterButton={
            <Button 
              type="primary"
            >
              <Icon type="filter" />
            </Button>
          }
          onChange={(e) => this.setFilter(e.target.value)}
          onSearch={(filter) => this.setFilter(filter)}
        />
        <div style={{overflow: 'auto', height:'400px'}}>
          <List
              size="small"
              bordered={false}
              dataSource={getFilteredPlaces()}
              renderItem={getPlacesList}
          />
        </div>
      </div>
    );
  }
};
