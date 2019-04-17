import React, { Component } from 'react';
import {Marker, InfoWindow} from '@react-google-maps/api';

export default class MedicMarker extends Component {
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
    const {icon, place, zIndex} = props;
    const {visibleInfoWindow, mouseOver} = state;
    const {location, name, adress, tags, type} = place;
    
    //  debugger;

    return (
      <Marker
        onClick={toggleInfoWindow}
        onMouseOver={toggleMousOver}
        onMouseOut={toggleMousOver}
        position={location}
        // TODO: costom icons for different place types
        icon={icon}
        zIndex={zIndex}
      >
      {true &&
        <InfoWindow
          // disabling infoWindow on load
          onLoad={() => {
            this.toggleInfoWindow();
          }}
          // removing close button
          onDomReady={ () => {
            const closeButton = document.querySelector('.gm-style-iw>button');
            closeButton.parentNode.removeChild(closeButton);
          }}
          position={mouseOver || visibleInfoWindow ? location : null}
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
            type: {type} <br />
            name: {name} <br />
            adress: {adress} <br />
          </div>
        </InfoWindow>
      }
      </Marker>
    )
  }
}
