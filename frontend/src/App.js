import React  from 'react';
import routes from './routes';
import TopMenu from 'components/TopMenu';
import { Layout } from 'antd';
import axios from 'axios';

class App extends React.Component {
  componentWillMount() {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  }

  render() {
    return (
      <React.Fragment>
        {/* for map-dev only */}
        <Map />
        {/* //uncomment after map-dev
          router 
        */}
      </React.Fragment>
    );
  }
}

export default App;
