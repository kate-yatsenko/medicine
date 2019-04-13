import React, { Component } from 'react';
import {Checkbox, Input} from 'antd';

import {MAP_CHECK_PLACE_TYPES} from 'constants/map';

const CheckboxGroup = Checkbox.Group;
const Search = Input.Search;

export default class PlacesFilter extends Component {
  state = {
    checkedList: this.props.types,
  }

  onChange = (types) => {
    this.setState({checkedList: types})
  };

  render() {
    return (
      <div>
        <hr />
        <CheckboxGroup 
          options={MAP_CHECK_PLACE_TYPES} 
          value={this.state.checkedList} 
          onChange={this.onChange} 
        />
        <Search
          placeholder="input filter"
          // TODO onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
      </div>
    );
  }
};
