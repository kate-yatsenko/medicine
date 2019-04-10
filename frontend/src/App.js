import React  from 'react';
import routes from './routes';
import TopMenu from 'components/TopMenu';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopMenu/>
        {routes}
      </React.Fragment>
    );
  }
}

export default App;
