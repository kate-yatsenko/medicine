import React, { Component } from 'react';
import {Marker, InfoWindow} from '@react-google-maps/api';

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

  render() {
    const {props, state, toggleInfoWindow, toggleMousOver} = this;
    const {active, type, place} = props;
    const {visibleInfoWindow, mouseOver} = state;
    const {position, name, adress, tags} = place;
    const icon = `\\images\\map-marker-${type.toUpperCase()}${active ? '-active' : ''}.png`;
    const zIndex = active ? 3 : type=='USER' ? 2 : 1;

    return (
      <Marker
        onClick={toggleInfoWindow}
        onMouseOver={toggleMousOver}
        onMouseOut={toggleMousOver}
        position={position}
        icon={icon}
        zIndex={zIndex}
      >
      {true &&
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
            pixelOffset: {height: -43},
            disableAutoPan: true,
          }}
        >
          {/* TODO: component InfoWindowContent. Add photo? */}
          {/* <InfoWindowContent types={types} name={name} adress={adress}/> */}
          <div style={{
            background: `white`,
            border: `1 solid #ccc`,
            padding: 5,
            color: 'blue'
          }}>
            tags: {tags.join(', ')} <br />
            name: {name} <br />
            adress: {adress} <br />
          </div>
        </InfoWindow>
      }
      </Marker>
    )
  }
}
