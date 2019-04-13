import React, { Component } from 'react';
import {Marker, InfoWindow} from '@react-google-maps/api';

export default class MyMarker extends Component {
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
  }

  render() {
    const {position, name, adress, types} = this.props;
    const {visibleInfoWindow, mouseOver} = this.state;

    return (
      <Marker
        onClick={this.toggleInfoWindow}
        onMouseOver={this.toggleMousOver}
        onMouseOut={this.toggleMousOver}
        position={position}
        // TODO: costom icons for different place types
        // label={{
        //   color: 'white',
        //   fontWeight: 'bold',
        //   text: '+',
        //   fontSize: '24px'
        // }}
        //src="/images/menu-logo.png"
        // icon="/images/medicine.png"
      >
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
            types: {types.join(', ')} <br />
            name: {name} <br />
            adress: {adress} <br />
          </div>
        </InfoWindow>
      </Marker>
    )
  }
}