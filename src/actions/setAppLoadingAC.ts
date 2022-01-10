import { Action } from 'redux';

import { SET_APP_LOADING } from './types';

export interface SetAppLoadingAction extends Action<'SET_APP_LOADING'> {
  payload: boolean;
}

const setAppLoading = (appLoading: boolean): SetAppLoadingAction => ({
  type: SET_APP_LOADING,
  payload: appLoading
});

export default setAppLoading;
