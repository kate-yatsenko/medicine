import React, { Component } from 'react';
import {Button, Slider, InputNumber, Input} from 'antd';
import {StandaloneSearchBox} from '@react-google-maps/api';

export default class PlacesSearch extends Component {
  state = {
    radius: this.props.radius,
  }

  marks = {
    100: '100 m',
    // 200: '200 m',
    500: '500 m',
    1000: '1 km',
    2000: '2 km',
    5000: '5 km',
    //10000: '10 km',
    // 1000: {
    //   style: {
    //     color: '#f50',
    //   },
    //   label: <strong>100°C</strong>,
    // },

  };
  onChange = (value) => {
    // if Number.isNaN
    this.setState({
      radius: value,
      // loading: false,
    });
  };

  componentDidUpdate() {
    const input = document.getElementById('address-search');
    if (input) {
      input.value=null;
    }
  }

  render() {
    const {state, marks, onChange} = this;
    const {radius} = state;
    const {map, adress, endSearchPosition, placesService, position, searchPlaces, loadingMessage} = this.props;
    if (map) {
      StandaloneSearchBox.contextType = React.createContext(map);
    }

    return (
      <div>
        <Button 
          shape="circle" 
          icon="user" 
          // TODO: onClick={} 
        />{ }
        {map?
          <StandaloneSearchBox
            onLoad={ref => {this.searchBox = ref;}}
            onPlacesChanged={() => {
              const [{formatted_address: adress, geometry: {location: position}}] = this.searchBox.getPlaces();
              endSearchPosition({position, adress, alerts: null, errors: null});
            }}
          >
            <Input 
              id="address-search"
              placeholder={adress} 
            />
          </StandaloneSearchBox>
        : <Input placeholder="Goople Maps API librares not loaded" />
        }
        <Slider 
          min={100}
          max={5000}
          marks={marks} 
          value={radius} 
          style={{ width: 280 }}
          step={100} 
          onChange={onChange}
          // TODO: onAfterChange={}
        />
        <InputNumber
          value={radius}
          min={100}
          max={5000}
          step={100}
          //formatter={value => value < 1000 ? `${value} m` : `${value} km`}
          // parser={value => value.replace('%', '')}
          onChange={onChange}
        />
        <Button 
          shape="circle" 
          icon="search" 
          loading={!!loadingMessage} 
          onClick={() => {
            searchPlaces({placesService, position, radius})
          }} 
        />{ }
      </div>
    );
  }
};
