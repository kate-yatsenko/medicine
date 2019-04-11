import React, { Component } from 'react';
// import routes from './routes';
import Map from './components/Map';


class App extends Component {
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
