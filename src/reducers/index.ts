import { Reducer, CombinedState, combineReducers } from 'redux';

import { Category, NullableCategory } from 'models';
import { AppAction } from 'actions';

import testDataReducer from './testDataReducer';
import categoriesReducer from './categoriesReducer';
import currentCategoryReducer from './currentCategoryReducer';

export interface GlobalState {
  testData: number;
  categories: Category[];
  currentCategory: NullableCategory;
}

type RootReducer =
  Reducer<CombinedState<GlobalState>, AppAction>;

const rootReducer: RootReducer = combineReducers({
  testData: testDataReducer,
  categories: categoriesReducer,
  currentCategory: currentCategoryReducer
});

export default rootReducer;
