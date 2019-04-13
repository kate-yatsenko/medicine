import React  from 'react';
import routes from './routes';
import TopMenu from 'components/TopMenu';
import { Layout } from 'antd';

class App extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <TopMenu/>
        {routes}
      </Layout>
    );
  }
}

export default App;
