import { Action } from 'redux';

import { ENABLE_APP_LOADING } from './types';

export type EnableAppLoadingAction = Action<'ENABLE_APP_LOADING'>;

const enableAppLoading: () => EnableAppLoadingAction =
  () => ({ type: ENABLE_APP_LOADING });

export default enableAppLoading;
