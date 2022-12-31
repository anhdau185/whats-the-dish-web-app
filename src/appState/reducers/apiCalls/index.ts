import { combineReducers } from 'redux';

import { ApiCallsState } from 'appState/types';

import fetchCategoriesReducer from './fetchCategoriesReducer';
import fetchDishesReducer from './fetchDishesReducer';

const apiCallsReducer = combineReducers<ApiCallsState, AnyAction>({
  fetchCategories: fetchCategoriesReducer,
  fetchDishes: fetchDishesReducer
});

export default apiCallsReducer;
