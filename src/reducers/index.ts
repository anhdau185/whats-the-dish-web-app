import { Reducer, CombinedState, combineReducers } from 'redux';

import { Category, NullableCategory, NullableDish } from 'models';
import { AppAction } from 'actions';

import testDataReducer from './testDataReducer';
import categoriesReducer from './categoriesReducer';
import currentCategoryReducer from './currentCategoryReducer';
import currentDishReducer from './currentDishReducer';

export interface GlobalState {
  testData: number;
  categories: Category[];
  currentCategory: NullableCategory;
  currentDish: NullableDish;
}

type RootReducer =
  Reducer<CombinedState<GlobalState>, AppAction>;

const rootReducer: RootReducer = combineReducers({
  testData: testDataReducer,
  categories: categoriesReducer,
  currentCategory: currentCategoryReducer,
  currentDish: currentDishReducer
});

export default rootReducer;
