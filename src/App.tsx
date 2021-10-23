import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { EmptyProps } from 'utils';
import fetchAllCategories from 'actions/fetchAllCategories';
import AppBar from 'components/AppBar/AppBar';
import HomePage from 'pages/HomePage/HomePage';
import CategoryPage from 'pages/CategoryPage/CategoryPage';

const App: FC<EmptyProps> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
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
