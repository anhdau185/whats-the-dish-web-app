import { Reducer, CombinedState, combineReducers } from 'redux';

import { NullableDish } from 'models';
import { AppAction } from 'actions';

import testDataReducer from './testDataReducer';
import currentDishReducer from './currentDishReducer';
import appLoadingReducer from './appLoadingReducer';
import fetchCategoriesApiCallReducer, {
  FetchCategoriesApiCall
} from './fetchCategoriesApiCallReducer';

export interface GlobalState {
  testData: number;
  currentDish: NullableDish;
  appLoading: boolean;
  fetchCategoriesApiCall: FetchCategoriesApiCall;
}

type RootReducer =
  Reducer<CombinedState<GlobalState>, AppAction>;

const rootReducer: RootReducer = combineReducers({
  testData: testDataReducer,
  currentDish: currentDishReducer,
  appLoading: appLoadingReducer,
  fetchCategoriesApiCall: fetchCategoriesApiCallReducer
});

export default rootReducer;
