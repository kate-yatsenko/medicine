import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const SEARCH_PLACE_TYPES = [
  'hospital',
  'doctor',
  'pharmacy',
  'dentist',
  'physiotherapist',
];

export default class PlacesFilter extends Component {
  state = {
    place: SEARCH_PLACE_TYPES[0],
  }

  /*onCategoryChange = (value) => {
    this.setState({
      place: value,
    });
    console.log(this.state);
  }*/
  
  render() {
    // const props = this.props;
    const { place } = this.state;
    const { onCategoryChange } = this.props;
    return (
      <div style={{marginBottom: "10px"}}>
        <h5 style={{marginBottom: "5px"}}>PlacesFilter:</h5>
        <Select
          defaultValue={place}
          style={{ width: 120 }}
          onChange={e => onCategoryChange(e)}
        >
          {SEARCH_PLACE_TYPES.map(place => <Option key={place} value={place}>{place}</Option>)}
        </Select>
  
      </div>
    );
  }
};