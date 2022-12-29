import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* Pages */
import HomePage from './HomePage';
import CategoryListingPage from './CategoryListingPage';
import CategoryPage from './CategoryPage';
import DishListingPage from './DishListingPage';
import DishPage from './DishPage';
import Playground from './Playground';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/categories" component={CategoryListingPage} />
    <Route exact path="/categories/:id" component={CategoryPage} />
    <Route exact path="/dishes" component={DishListingPage} />
    <Route exact path="/dishes/:id" component={DishPage} />
    <Route exact path="/playground" component={Playground} />
  </Switch>
);

export default Routes;
