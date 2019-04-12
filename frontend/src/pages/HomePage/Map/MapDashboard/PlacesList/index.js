import React, { Component } from 'react';

export default class PlacesList extends Component {
  render() {
    // const props = this.props;
    return (
      <div>
        <hr />PlacesList:<br />
        {JSON.stringify(this.props)}
      </div>
    );
  }
};