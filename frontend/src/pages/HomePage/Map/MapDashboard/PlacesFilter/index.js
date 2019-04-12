import React, { Component } from 'react';

export default class PlacesFilter extends Component {
  render() {
    // const props = this.props;
    return (
      <div>
        <hr />PlacesFilter:<br />
        {JSON.stringify(this.props)}
      </div>
    );
  }
};