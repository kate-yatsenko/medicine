import React, { Component } from 'react';
import {Button, Slider, InputNumber, Input, Radio, Icon, Tooltip} from 'antd';
import {StandaloneSearchBox} from '@react-google-maps/api';

import './style.css';

const MyLocationSvg = () => (
  <svg className="icon" width="1.7em" height="1.7em" viewBox="0 0 1024 1024">
    <path fill="#FFFFFF" d="M764.586667 554.666667C746.666667 661.333333 661.333333 746.666667 554.666667 764.586667L554.666667 682.666667 469.333333 682.666667 469.333333 764.586667C362.666667 746.666667 277.333333 661.333333 259.413333 554.666667L341.333333 554.666667 341.333333 469.333333 259.413333 469.333333C277.333333 362.666667 362.666667 277.333333 469.333333 259.413333L469.333333 341.333333 554.666667 341.333333 554.666667 259.413333C661.333333 277.333333 746.666667 362.666667 764.586667 469.333333L682.666667 469.333333 682.666667 554.666667 764.586667 554.666667M850.773333 469.333333C832 314.88 709.12 192 554.666667 173.226667L554.666667 85.333333 469.333333 85.333333 469.333333 173.226667C314.88 192 192 314.88 173.226667 469.333333L85.333333 469.333333 85.333333 554.666667 173.226667 554.666667C192 709.12 314.88 832 469.333333 850.773333L469.333333 938.666667 554.666667 938.666667 554.666667 850.773333C709.12 832 832 709.12 850.773333 554.666667L938.666667 554.666667 938.666667 469.333333 850.773333 469.333333M512 426.666667C558.933333 426.666667 597.333333 465.066667 597.333333 512 597.333333 558.933333 558.933333 597.333333 512 597.333333 465.066667 597.333333 426.666667 558.933333 426.666667 512 426.666667 465.066667 465.066667 426.666667 512 426.666667L512 426.666667Z" />
  </svg>
);

const MyLocationIcon = () => (
  <Icon component={MyLocationSvg} aria-label="my-location"/>
);

export default class PlacesSearch extends Component {
  state = {
    radius: this.props.radius,
    type: this.props.type,
    visible: false,
  }
  marks = {
    100: {
      style: {
        left: '5%',
      },
      label: <strong>100 м</strong>,
    },
    5000: {
      style: {
        width: '45px',
        left: '95%',
      },
      label: <strong>5 км</strong>,
    },
  };

  onChangeRadius = (value) => {
    let radius = Number.parseInt(value);
    if (Number.isNaN(radius)) {
      radius = this.state.radius;
    } else {
      radius = 100 * Math.round(radius/100);
    }
    this.setState({radius});
  };
  onChangeSearchType = (e) => {
    this.setState({type: e.target.value});
  };
  toggleVisibility = () => {
    this.setState((state) => ({visible: !state.visible}))
  }
  radiusFormatter(value) {
    const km = Math.trunc(value/1000);
    const m = value - 1000 * km;
    return `${km?km+' км ':''}${m?m+' м':''}`;
  }
  
  componentDidUpdate() {
    const input = document.getElementById('address-search');
    if (input) {
      input.value=null;
    }
  }

  render() {
    const {state, marks, onChangeRadius, onChangeSearchType, radiusFormatter, toggleVisibility} = this;
    const {radius, type, visible} = state;
    const {map,adress,endSearchPosition,getLocation,placesService,geocoderService,position,searchPlaces,messages:{loading}} = this.props;
    if (map) {
      StandaloneSearchBox.contextType = React.createContext(map);
    }

    return (
      <div className="places-search">
        {visible?
          <React.Fragment>
            <Button 
              className="map-dashboard-close-btn"
              onClick={toggleVisibility}
            >
              <Icon type="setting" />
              Приховати налаштування
              <Icon type="up" />
            </Button>
            <h1>Центр пошуку:</h1>
            <Tooltip placement="topLeft" title="Визначити місцезнаходження" mouseEnterDelay={0.7}>
              <Button
                className="my-location-button"
                shape="circle"
                type="primary"
                onClick={() => getLocation(geocoderService, placesService)}
              >
                <MyLocationIcon />
              </Button>
            </Tooltip>
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
                  className="map-dashboard-input"
                  placeholder={adress} 
                />
              </StandaloneSearchBox>
            : <Input placeholder="Goople Maps API librares not loaded" />
            }
            <h1>Тип пошуку:</h1>
            <Radio.Group 
              defaultValue={type}
              buttonStyle="solid"
              onChange={onChangeSearchType}
            >
              <Radio.Button value="MEDIC">Загальний</Radio.Button>
              <Radio.Button value="DENTIST">Стоматології</Radio.Button>
              <Radio.Button value="PHARMACY">Аптеки</Radio.Button>
            </Radio.Group>
            <h1>Радіус пошуку:</h1>
            <InputNumber
              value={radius}
              min={100}
              max={5000}
              step={100}
              onChange={onChangeRadius}
              formatter={radiusFormatter}
            />
            <Slider 
              min={100}
              max={5000}
              marks={marks}
              value={radius}
              style={{ width: 280 }}
              step={100}
              onChange={onChangeRadius}
              tipFormatter={radiusFormatter}
            />
            <Button 
              className="map-dashboard-search-btn"
              type="primary"
              icon="search"
              loading={loading === 'Пошук медичних закладів'}
              onClick={() => {
                searchPlaces({placesService, position, radius, type})
              }}
            >
              Пошук
            </Button>
          </React.Fragment>
        :
          <Button 
            type="primary"
            className="map-dashboard-open-btn"
            onClick={toggleVisibility}
          >
            <Icon type="setting" />
            Налаштування пошуку
            <Icon type="down" />
          </Button>

        }
      </div>
    );
  }
};
