import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { EmptyProps } from 'utilities/interfaces';
import fetchAllCategories from 'actions/fetchAllCategories';
import AppBar from 'components/AppBar/AppBar';
import HomePage from 'pages/HomePage/HomePage';

const App: FC<EmptyProps> = () => {
  const dispatch = useDispatch();

  useEffect((): void => {
    dispatch(fetchAllCategories(null));
  }, []);

  return (
    <Router>
      <div className="app">
        <AppBar />
        <div className="page">
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
