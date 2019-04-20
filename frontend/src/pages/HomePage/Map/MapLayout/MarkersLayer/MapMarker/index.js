import React, { Component } from 'react';
import {Marker, InfoWindow} from '@react-google-maps/api';

import './style.css';

export default class MapMarker extends Component {
  state = {
    visibleInfoWindow: true,
    mouseOver: false,
  }

  toggleInfoWindow = () => {
    this.setState((state) => {
      return {visibleInfoWindow: !state.visibleInfoWindow};
    });
  };
  toggleMousOver = () => {
    this.setState((state) => {
      return {mouseOver: !state.mouseOver};
    });
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
    const {state: {visibleInfoWindow, mouseOver}, toggleInfoWindow, toggleMousOver, getTagsList} = this;
    const {active, type, place} = this.props;
    const {position, name, adress, tags, rating, ratingUsers} = place;
    const icon = `/images/map-marker-${type.toUpperCase()}${active ? '-active' : ''}.png`;
    const zIndex = active ? 3 : type === 'USER' ? 2 : 1;

    return (
      <Marker
        onClick={toggleInfoWindow}
        onMouseOver={toggleMousOver}
        onMouseOut={toggleMousOver}
        position={position}
        icon={icon}
        zIndex={zIndex}
      >
        <InfoWindow
          // disabling infoWindow on load
          onLoad={() => {this.toggleInfoWindow()}}
          // removing close button
          onDomReady={ () => {
            const closeButton = document.querySelector('.gm-style-iw>button');
            closeButton.parentNode.removeChild(closeButton);
          }}
          position={mouseOver || visibleInfoWindow ? position : null}
          options={{
            pixelOffset: {height: -35},
            disableAutoPan: true,
          }}
        >
          <div className="map-info-window" >
             <h1>{name}</h1>
             <p><b>Адреса: </b>{adress}</p>
             {!(rating===false) && <p><b>Рейтинг: </b>{rating?rating:'?'}/5 (відгуків - {ratingUsers?ratingUsers:0})</p>}
             {tags && <p>{getTagsList(tags)}</p>}
          </div>
        </InfoWindow>
      </Marker>
    )
  }
}
