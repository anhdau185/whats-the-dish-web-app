import { handleActions } from 'redux-actions';

import { FetchCategoriesApiCall } from 'appState/types';
import { UpdateLocalCategoriesAction } from 'appState/actions/types';
import { API_CALL_FETCH_CATEGORIES } from 'appState/actions/constants';

const initialState: FetchCategoriesApiCall = {
  data: [],
  error: null,
  loading: false
};

const fetchCategoriesReducer = handleActions<
  FetchCategoriesApiCall,
  UpdateLocalCategoriesAction['payload']
>({
  [API_CALL_FETCH_CATEGORIES]: (state, { payload }) => ({ ...state, ...payload })
}, initialState);

export default fetchCategoriesReducer;
