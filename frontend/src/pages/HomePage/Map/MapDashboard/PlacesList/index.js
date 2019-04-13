import React, { Component } from 'react';
import {Collapse, List, Alert } from 'antd';

const Panel = Collapse.Panel;

export default class PlacesList extends Component {
  state = {
    selectedKey: null,
  }

  onItemClick = (placeId, location, map) => {
    map.panTo(location);
    this.setState({
      selectedKey: placeId,
    });
  }
  getPlacesList = ({placeId, location, name, adress, type, tags, rating}) => {
    return (
      <List.Item 
        key={placeId} 
        style={{cursor:'pointer',}}
        onClick={() => {
          this.onItemClick(placeId, location, this.props.map)}}
      >
        {name}
        {placeId === this.state.selectedKey &&
          <div style={{paddingLeft: '10px', fontStyle: 'italic', width: '250px'}}>
            {adress}<br />
            {type}<br />
            {tags.join(', ')}<br />
            {`рейтинг: ${rating.value?rating.value:'-'}/5 (відгуків - ${rating.users?rating.users:0})`}
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
