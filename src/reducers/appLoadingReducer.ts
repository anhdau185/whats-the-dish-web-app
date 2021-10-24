import { Reducer } from 'redux';

import {
  EnableAppLoadingAction,
  DisableAppLoadingAction
} from 'actions';
import {
  ENABLE_APP_LOADING,
  DISABLE_APP_LOADING
} from 'actions/types';

type AppLoadingReducer =
  Reducer<boolean, EnableAppLoadingAction | DisableAppLoadingAction>;

const appLoadingReducer: AppLoadingReducer =
  (prevState = false, action) => {
    switch (action.type) {
      case ENABLE_APP_LOADING:
        return true;
      case DISABLE_APP_LOADING:
        return false;
      default:
        return prevState;
    }
  };

export default appLoadingReducer;
