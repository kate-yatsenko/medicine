import React, { Component } from 'react';
import {Collapse, List, Alert } from 'antd';

const Panel = Collapse.Panel;

export default class PlacesList extends Component {
  state = {
    selectedKey: null,
  }

  onItemClick = (place_id, location, map) => {
    map.panTo(location);
    this.setState({
      selectedKey: place_id,
    });
  }
  getPlacesList = ({place_id, geometry, name, vicinity, types}) => {
    return (
      <List.Item 
        key={place_id} 
        style={{cursor:'pointer',}}
        onClick={() => {
          this.onItemClick(place_id, geometry.location, this.props.map)}}
      >
        {name}
        {place_id === this.state.selectedKey &&
          <div style={{paddingLeft: '10px', fontStyle: 'italic', width: '250px'}}>
            {vicinity}<br />
            {types.join(', ')}
          </div>
        }
      </List.Item>
    )
  }

  render() {
    // const props = this.props;
    return (
      <List
          size="small"
          footer={
            <Alert 
              message="Перевищено кількість об'єктів одного типу у вказаному радіусі пошуку" 
              type="warning"
              closable
              style={{fontSize: '8pt'}}
            />
          }
          bordered
          dataSource={this.props.places}
          renderItem={this.getPlacesList}
        />
    );
  }
};
