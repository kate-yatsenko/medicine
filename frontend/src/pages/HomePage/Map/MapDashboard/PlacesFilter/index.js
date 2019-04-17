import React, { Component } from 'react';
import {Input} from 'antd';

const Search = Input.Search;

export default class PlacesFilter extends Component {
  state = {
    checkedList: this.props.types,
  }

  render() {
    return (
      <div>
        <Search
          placeholder="input filter"
          // TODO onSearch={}
          style={{ width: 200 }}
        />
      </div>
    );
  }
};
