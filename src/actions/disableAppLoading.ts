import { Action } from 'redux';

import { DISABLE_APP_LOADING } from './types';

export type DisableAppLoadingAction = Action<'DISABLE_APP_LOADING'>;

const disableAppLoading: () => DisableAppLoadingAction =
  () => ({ type: DISABLE_APP_LOADING });

export default disableAppLoading;
