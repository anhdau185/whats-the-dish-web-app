import { handleActions } from 'redux-actions';
import { SET_APP_LOADING } from 'actions/constants';

const appLoadingReducer = handleActions<boolean>({
  [SET_APP_LOADING]: (_, { payload }) => payload
}, false);

export default appLoadingReducer;
