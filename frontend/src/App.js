import React, { Component } from 'react';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {routes}
      </React.Fragment>
    );
  }
}

export default App;
