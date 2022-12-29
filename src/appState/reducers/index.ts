import { Reducer, CombinedState, combineReducers } from 'redux';

import appLoadingReducer from './appLoadingReducer';
import fetchCategoriesApiCallReducer from './fetchCategoriesApiCallReducer';
import fetchDishesApiCallReducer from './fetchDishesApiCallReducer';
import pingingReducer from './pingingReducer';

type RootReducer = Reducer<CombinedState<GlobalState>, AnyAction>;

const rootReducer: RootReducer = combineReducers({
  appLoading: appLoadingReducer,
  fetchCategoriesApiCall: fetchCategoriesApiCallReducer,
  fetchDishesApiCall: fetchDishesApiCallReducer,
  pinging: pingingReducer
});

export default rootReducer;
