import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Alert, Spin, Icon} from 'antd';

import './style.css';

const mapStateToProps = ({mapState}) => {
  return {...mapState.gmaps.messages};
}

class AlertsLayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      places: [],
    }
  }
  static counter = 0;
  getAlertsList(messages, type) {
    return messages.map((message) => (
      <Alert 
        className="map-alert" 
        key={AlertsLayer.counter++} 
        message={message} 
        type={type} 
        showIcon 
        closable 
      />
    ))
  }

  render() {
    const {loading, alerts, errors} = this.props;
    return (
      <div 
        className={loading ? 'alerts-layer loading' : 'alerts-layer'}
      >
        {alerts && alerts.length && this.getAlertsList(alerts, 'warning')}
        {errors && errors.length && this.getAlertsList(errors, 'error')}
        {loading &&
          <Spin 
            className="map-spin"
            tip={loading}
            indicator={<Icon type="loading" style={{fontSize: 80}} spin />}
          >
            <div className="map-fade"></div>
          </Spin>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(AlertsLayer);
