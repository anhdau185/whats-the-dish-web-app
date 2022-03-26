import React from 'react';
import { Route } from 'react-router-dom';

/* Pages */
import HomePage from 'pages/HomePage';
import CategoryListingPage from 'pages/CategoryListingPage';
import CategoryPage from 'pages/CategoryPage';
import DishListingPage from 'pages/DishListingPage';
import DishPage from 'pages/DishPage';

const Routes: React.FC = () => (
  <>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/categories" component={CategoryListingPage} />
    <Route exact path="/categories/:id" component={CategoryPage} />
    <Route exact path="/dishes" component={DishListingPage} />
    <Route exact path="/dishes/:id" component={DishPage} />
  </>
);

export default Routes;
