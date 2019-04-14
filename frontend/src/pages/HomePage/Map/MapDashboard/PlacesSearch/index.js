import React, { Component } from 'react';
import {Button, Slider, InputNumber, Input} from 'antd';
import {StandaloneSearchBox} from '@react-google-maps/api';

export default class PlacesSearch extends Component {
  state = {
    dataSource: [],
    inputValue: 500,
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  };
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
      inputValue: value,
    });
  }

  render() {
    const {state, marks, onChange, handleSearch} = this;
    const {inputValue, dataSource} = state;
    const {map, adress} = this.props;
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
            onLoad={ref => this.searchBox = ref}
            onPlacesChanged={
              () => console.log(this.searchBox.getPlaces())
            }
          >
            <Input placeholder={adress} />
          </StandaloneSearchBox>
        : <Input placeholder="Goople Maps API librares not loaded" />
        }
        <Slider 
          min={100}
          max={5000}
          marks={marks} 
          value={inputValue} 
          style={{ width: 280 }}
          step={100} 
          onChange={onChange}
          // TODO: onAfterChange={}
        />
        <InputNumber
          value={inputValue}
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
          // TODO: onClick={} 
        />{ }
      </div>
    );
  }
};
