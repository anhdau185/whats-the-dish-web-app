import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { EmptyProps } from 'utils';
import AppBar from 'components/AppBar';

/* Pages */
import HomePage from 'pages/HomePage';
import CategoryListingPage from 'pages/CategoryListingPage';
import CategoryPage from 'pages/CategoryPage';
import DishListingPage from 'pages/DishListingPage';
import DishPage from 'pages/DishPage';

const App: FC<EmptyProps> = () => (
  <Router>
    <div className="app">
      <AppBar />
      <div className="page">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/categories" component={CategoryListingPage} />
          <Route exact path="/categories/:id" component={CategoryPage} />
          <Route exact path="/dishes" component={DishListingPage} />
          <Route exact path="/dishes/:id" component={DishPage} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
