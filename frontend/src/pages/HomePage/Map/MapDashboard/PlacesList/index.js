import React, { Component } from 'react';
import { List,  Icon } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


export default class PlacesList extends Component {
  render() {
    // const props = this.props;
    const values = Object.values(this.props);
  console.log(values);
    return (
      <div>
        <h4 style={{marginBottom: "10px" }}>Searched places:</h4>
        <List
    itemLayout="horizontal"
    dataSource={values}
    renderItem={item => (
      <List.Item
        key={item.id}
        actions={ [<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
        style={{ display: "flex", flexWrap: "wrap" }} 
      >
        <List.Item.Meta
          title={<a href={item.href}>{item.name}</a>}
          description={item.vicinity}
        />
        {item.content}
      </List.Item>
    )}
  />
      </div>
    );
  }
};