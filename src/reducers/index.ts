import { Reducer, CombinedState, combineReducers } from 'redux';

import { CategoryModel, NullableCategoryModel } from 'models';
import { AppAction } from 'actions/declarations';

import testDataReducer from './testDataReducer';
import categoriesReducer from './categoriesReducer';
import currentCategoryReducer from './currentCategoryReducer';

export interface GlobalState {
  testData: number;
  categories: CategoryModel[];
  currentCategory: NullableCategoryModel;
}

type RootReducer =
  Reducer<CombinedState<GlobalState>, AppAction>;

const rootReducer: RootReducer = combineReducers({
  testData: testDataReducer,
  categories: categoriesReducer,
  currentCategory: currentCategoryReducer
});

export default rootReducer;
