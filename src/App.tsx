import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Routes from 'routes';
import AppBar from 'components/AppBar';
import AppProgress from 'components/AppProgress';

const App: React.FC = () => (
  <BrowserRouter>
    <div className="app">
      <AppProgress />
      <AppBar />
      <div className="page">
        <Switch>
          <Routes />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
