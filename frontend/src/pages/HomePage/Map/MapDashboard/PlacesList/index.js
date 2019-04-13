import React, { Component } from 'react';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;

export default class PlacesList extends Component {

  getPanelList(places) {
    return places.map((place) => {
      const {place_id, name, vicinity, types} = place;
      return (
        <Panel 
          key={place_id} 
          header={name}
          showArrow={false}
        >
          {vicinity} <hr />
          {types.join(', ')}
        </Panel>
        );
    })
  }

  render() {
    // const props = this.props;
    return (
      <div>
        <Collapse 
          bordered={false} 
          accordion
        >
          {this.getPanelList(this.props.places)}
        </Collapse>
      </div>
    );
  }
};
