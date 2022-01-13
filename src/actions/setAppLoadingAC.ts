import { Action } from 'redux';

import { SET_APP_LOADING } from './types';

export interface SetAppLoadingAction extends Action<'SET_APP_LOADING'> {
  payload: boolean;
}

type SetAppLoadingActionCreator = (appLoading: boolean) => SetAppLoadingAction;

const setAppLoadingAC: SetAppLoadingActionCreator = appLoading => ({
  type: SET_APP_LOADING,
  payload: appLoading
});

export default setAppLoadingAC;
