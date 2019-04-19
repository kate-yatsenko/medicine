import React, { Component } from 'react';
import {Button, Slider, InputNumber, Input, Radio} from 'antd';
import {StandaloneSearchBox} from '@react-google-maps/api';

export default class PlacesSearch extends Component {
  state = {
    radius: this.props.radius,
    type: this.props.type,
  }

  marks = {
    100: '100m',
    5000: '5km',
  };
  onChangeRadius = (value) => {
    // if Number.isNaN
    this.setState({
      radius: value,
      // loading: false,
    });
  };
  onChangeSearchType = (e) => {
    this.setState({type: e.target.value});
  };

  componentDidUpdate() {
    const input = document.getElementById('address-search');
    if (input) {
      input.value=null;
    }
  }

  render() {
    const {state, marks, onChangeRadius, onChangeSearchType} = this;
    const {radius, type} = state;
    const {map, adress, endSearchPosition, getLocation, placesService, geocoderService, position, searchPlaces, loadingMessage} = this.props;
    if (map) {
      StandaloneSearchBox.contextType = React.createContext(map);
    }

    return (
      <div>
        <Button 
          shape="circle" 
          icon="user" 
          onClick={() => getLocation(geocoderService, placesService)}
        />{ }
        {map?
          <StandaloneSearchBox
            onLoad={ref => {this.searchBox = ref;}}
            onPlacesChanged={() => {
              const places = this.searchBox.getPlaces();
              if (places.length) {
                const [{formatted_address: adress, geometry: {location: position}}] = places;
                endSearchPosition({position, adress, alerts: [], errors: []});
              }
            }}
          >
            <Input 
              id="address-search"
              placeholder={adress} 
            />
          </StandaloneSearchBox>
        : <Input placeholder="Goople Maps API librares not loaded" />
        }
        <Radio.Group 
          defaultValue={type} 
          buttonStyle="solid"
          onChange={onChangeSearchType}
        >
          <Radio.Button value="MAIN">MAIN</Radio.Button>
          <Radio.Button value="DENTIST">DENTIST</Radio.Button>
          <Radio.Button value="PHARMACY">PHARMACY</Radio.Button>
        </Radio.Group>
        <Slider 
          min={100}
          max={5000}
          marks={marks} 
          value={radius} 
          style={{ width: 280 }}
          step={100} 
          onChange={onChangeRadius}
          // TODO: onAfterChange={}
        />
        <InputNumber
          value={radius}
          min={100}
          max={5000}
          step={100}
          //formatter={value => value < 1000 ? `${value} m` : `${value} km`}
          // parser={value => value.replace('%', '')}
          onChange={onChangeRadius}
        />
        <Button 
          shape="circle" 
          icon="search" 
          loading={!!loadingMessage} 
          onClick={() => {
            searchPlaces({placesService, position, radius, type})
          }} 
        />{ }
      </div>
    );
  }
};
