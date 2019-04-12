import React, { Component } from 'react';

export default class PlacesSearch extends Component {
  render() {
    // const props = this.props;
    return (
      <div>
        <hr />PlacesSearch:<br />
        {JSON.stringify(this.props)}
      </div>
    );
  }
};