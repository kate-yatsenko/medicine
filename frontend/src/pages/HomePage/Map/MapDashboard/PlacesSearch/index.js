import React, { Component } from 'react';
import { Button, Input, Slider } from 'antd';

export default class PlacesSearch extends Component {
  state = {
    loading: false,
    iconLoading: false,
  }

  enterLoading = () => {
    this.setState({ loading: true });
  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  }

   onSliderChange(value) {
    console.log(value);
  }
  
   onAfterChange(value) {
    console.log('onAfterChange: ', value);
  }

  render() {
    // const props = this.props;
    console.log(this.props);
    const Search = Input.Search;

    return (
      <div style={{marginBottom: "20px"}}>
         <div style={{marginBottom: "10px"}}>
           <h4> Search ...</h4>
           <Button type="primary" loading={this.state.loading} onClick={this.enterLoading} {... this.props}>
             Show my location
           </Button>
         </div>
        
        <div style={{marginBottom: "10px"}}>
        <h5> Search by adress</h5>
        <Search
      placeholder="input search adress"
      onSearch={value => console.log(value)}
      enterButton
    />
    </div>
    <div style={{marginBottom: "10px"}}>
      <h5> Search in radius</h5>
    <Slider defaultValue={30} onChange={this.onSliderChange} onAfterChange={this.onAfterChange} />
    </div>
      </div>
    );
  }
};