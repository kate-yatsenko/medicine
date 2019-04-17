import React, { Component } from 'react';
import { Button, Input, Slider } from 'antd';


const marks = {
  500: '500 м',
  1000: '1 км',
  2000: '2 км',
  5000: '5 км',
};
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
    const { getGeoLocation } = this.props;
    return (
      <div style={{marginBottom: "20px"}}>
         <div style={{marginBottom: "10px"}}>
           <Button type="primary" loading={this.state.loading} onClick={getGeoLocation} {... this.props}>
             Моє місцезнаходження
           </Button>
         </div>
        
        <div style={{marginBottom: "10px"}}>
        <h5> Пошук за адресою:</h5>
        <Search
      placeholder="введіть адресу..."
      onSearch={value => console.log(value)}
      enterButton
    />
    </div>
    <div style={{marginBottom: "10px"}}>
      <h5> Пошук в радіусі:</h5>
      <Slider 
          min={100}
          max={5000}
          marks={marks} 
          style={{ width: "340px" }}
          step={100} 
          onChange={e => console.log(e.target.value)}
          // TODO: onAfterChange={}
        />
    </div>
      </div>
    );
  }
};

 