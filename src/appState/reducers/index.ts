import { combineReducers } from 'redux';

import appLoadingReducer from './appLoadingReducer';
import pingingReducer from './pingingReducer';
import apiCallsReducer from './apiCalls';

const rootReducer = combineReducers<GlobalState, AnyAction>({
  appLoading: appLoadingReducer,
  pinging: pingingReducer,
  apiCalls: apiCallsReducer
});

export default rootReducer;
