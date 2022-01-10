import { Reducer, CombinedState, combineReducers } from 'redux';

import { AppAction } from 'actions';

import appLoadingReducer from './appLoadingReducer';
import fetchCategoriesApiCallReducer, {
  FetchCategoriesApiCall
} from './fetchCategoriesApiCallReducer';
import fetchDishesApiCallReducer, {
  FetchDishesApiCall
} from './fetchDishesApiCallReducer';

export interface GlobalState {
  appLoading: boolean;
  fetchCategoriesApiCall: FetchCategoriesApiCall;
  fetchDishesApiCall: FetchDishesApiCall;
}

type RootReducer =
  Reducer<CombinedState<GlobalState>, AppAction>;

const rootReducer: RootReducer = combineReducers({
  appLoading: appLoadingReducer,
  fetchCategoriesApiCall: fetchCategoriesApiCallReducer,
  fetchDishesApiCall: fetchDishesApiCallReducer
});

export default rootReducer;
