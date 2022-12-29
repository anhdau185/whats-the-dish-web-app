import { Reducer, CombinedState, combineReducers, AnyAction } from 'redux';

import appLoadingReducer from './appLoadingReducer';
import fetchCategoriesApiCallReducer, {
  FetchCategoriesApiCall
} from './fetchCategoriesApiCallReducer';
import fetchDishesApiCallReducer, {
  FetchDishesApiCall
} from './fetchDishesApiCallReducer';
import pingingReducer from './pingingReducer';

export interface GlobalState {
  appLoading: boolean;
  fetchCategoriesApiCall: FetchCategoriesApiCall;
  fetchDishesApiCall: FetchDishesApiCall;
  pinging: boolean;
}

type RootReducer = Reducer<CombinedState<GlobalState>, AnyAction>;

const rootReducer: RootReducer = combineReducers({
  appLoading: appLoadingReducer,
  fetchCategoriesApiCall: fetchCategoriesApiCallReducer,
  fetchDishesApiCall: fetchDishesApiCallReducer,
  pinging: pingingReducer
});

export default rootReducer;
