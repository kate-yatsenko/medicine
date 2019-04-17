import React, { Component } from 'react';
import {Checkbox, Input, Tooltip, Icon } from 'antd';

import {MAP_CHECK_PLACE_TYPES} from 'constants/map';

const CheckboxGroup = Checkbox.Group;


export default class PlacesFilter extends Component {
  state = {
    checkedList: this.props.types,
  }

  onChange = (types) => {
    this.setState({checkedList: types})
  
  };

  render() {
    const { onFilterByName, onCategoryChange } = this.props;
    console.log(this.state);
    return (
      <div>
       <h5> Пошук за категорією: </h5>
        <CheckboxGroup 
          options={MAP_CHECK_PLACE_TYPES} 
          value={this.state.checkedList} 
          onChange={value => onCategoryChange(...value)}
        />
         <h5> Пошук за назвою: </h5>
         <Input
          placeholder="Введіть назву..."
          onChange={e => onFilterByName(e.target.value)}
          suffix={
        <Tooltip title="Extra information">
           <Icon type="search" style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
    }
  />
      </div>
    );
  }
};
