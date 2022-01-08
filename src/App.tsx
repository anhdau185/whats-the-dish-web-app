import React, { FC } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { EmptyProps } from 'utils';
import Routes from 'routes';
import AppBar from 'components/AppBar';

const App: FC<EmptyProps> = () => (
  <BrowserRouter>
    <div className="app">
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
