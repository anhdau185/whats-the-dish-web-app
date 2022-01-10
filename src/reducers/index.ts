import { Reducer, CombinedState, combineReducers } from 'redux';

import { Category, NullableCategory, NullableDish } from 'models';
import { AppAction } from 'actions';

import testDataReducer from './testDataReducer';
import categoriesReducer from './categoriesReducer';
import currentCategoryReducer from './currentCategoryReducer';
import currentDishReducer from './currentDishReducer';
import appLoadingReducer from './appLoadingReducer';
import fetchCategoriesApiCallReducer, {
  FetchCategoriesApiCall
} from './fetchCategoriesApiCallReducer';

export interface GlobalState {
  testData: number;
  categories: Category[];
  currentCategory: NullableCategory;
  currentDish: NullableDish;
  appLoading: boolean;
  fetchCategoriesApiCall: FetchCategoriesApiCall;
}

type RootReducer =
  Reducer<CombinedState<GlobalState>, AppAction>;

const rootReducer: RootReducer = combineReducers({
  testData: testDataReducer,
  categories: categoriesReducer,
  currentCategory: currentCategoryReducer,
  currentDish: currentDishReducer,
  appLoading: appLoadingReducer,
  fetchCategoriesApiCall: fetchCategoriesApiCallReducer
});

export default rootReducer;
