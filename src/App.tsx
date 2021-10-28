import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { EmptyProps } from 'utils';
import enableAppLoading from 'actions/enableAppLoading';
import disableAppLoading from 'actions/disableAppLoading';
import fetchAllCategories from 'actions/fetchAllCategories';
import AppBar from 'components/AppBar';

/* Pages */
import CategoryListingPage from 'pages/CategoryListingPage';
import DishListingPage from 'pages/DishListingPage';
import CategoryPage from 'pages/CategoryPage';
import DishPage from 'pages/DishPage';

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
            <Route exact path="/" component={CategoryListingPage} />
            <Route exact path="/dishes" component={DishListingPage} />
            <Route exact path="/categories/:id" component={CategoryPage} />
            <Route exact path="/dishes/:id" component={DishPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
