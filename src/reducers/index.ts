import { Reducer, CombinedState, combineReducers } from 'redux';

import { Category, NullableDish } from 'models';
import { AppAction } from 'actions';

import testDataReducer from './testDataReducer';
import categoriesReducer from './categoriesReducer';
import currentDishReducer from './currentDishReducer';
import appLoadingReducer from './appLoadingReducer';
import fetchCategoriesApiCallReducer, {
  FetchCategoriesApiCall
} from './fetchCategoriesApiCallReducer';

export interface GlobalState {
  testData: number;
  categories: Category[];
  currentDish: NullableDish;
  appLoading: boolean;
  fetchCategoriesApiCall: FetchCategoriesApiCall;
}

type RootReducer =
  Reducer<CombinedState<GlobalState>, AppAction>;

const rootReducer: RootReducer = combineReducers({
  testData: testDataReducer,
  categories: categoriesReducer,
  currentDish: currentDishReducer,
  appLoading: appLoadingReducer,
  fetchCategoriesApiCall: fetchCategoriesApiCallReducer
});

export default rootReducer;
