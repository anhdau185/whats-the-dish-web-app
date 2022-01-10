import { Reducer } from 'redux';

import {
  EnableAppLoadingAction,
  DisableAppLoadingAction,
  SetAppLoadingAction
} from 'actions';
import {
  ENABLE_APP_LOADING,
  DISABLE_APP_LOADING,
  SET_APP_LOADING
} from 'actions/types';

type AppLoadingReducer =
  Reducer<boolean, EnableAppLoadingAction | DisableAppLoadingAction | SetAppLoadingAction>;

const appLoadingReducer: AppLoadingReducer =
  (prevState = false, action) => {
    switch (action.type) {
      case ENABLE_APP_LOADING:
        return true;
      case DISABLE_APP_LOADING:
        return false;
      case SET_APP_LOADING:
        return action.payload;
      default:
        return prevState;
    }
  };

export default appLoadingReducer;
