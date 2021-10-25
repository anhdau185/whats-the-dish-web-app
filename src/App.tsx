import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { EmptyProps } from 'utils';
import enableAppLoading from 'actions/enableAppLoading';
import fetchAllCategories from 'actions/fetchAllCategories';
import AppBar from 'components/AppBar';
import HomePage from 'pages/HomePage';
import CategoryPage from 'pages/CategoryPage';
import disableAppLoading from './actions/disableAppLoading';

const App: FC<EmptyProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableAppLoading());
    dispatch(
      fetchAllCategories({
        onCompletion: () => dispatch(disableAppLoading())
      })
    );
  }, []);

  return (
    <Router>
      <div className="app">
        <AppBar />
        <div className="page">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/categories/:id" component={CategoryPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
