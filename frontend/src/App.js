import React from 'react';
// import routes from './routes';
import Map from './pages/HomePage/Map';

class App extends React.Component {
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
