import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from 'pages/Routes';
import AppBar from 'components/AppBar';
import AppProgress from 'components/AppProgress';

const App: React.FC = () => (
  <BrowserRouter>
    <div className="app">
      <AppProgress />
      <AppBar />
      <div className="page">
        <Routes />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
