import { Reducer } from 'redux';

import { SetAppLoadingAction } from 'actions';
import { SET_APP_LOADING } from 'actions/types';

type AppLoadingReducer = Reducer<boolean, SetAppLoadingAction>;

const appLoadingReducer: AppLoadingReducer =
  (prevState = false, action) => {
    switch (action.type) {
      case SET_APP_LOADING:
        return action.payload;
      default:
        return prevState;
    }
  };

export default appLoadingReducer;
