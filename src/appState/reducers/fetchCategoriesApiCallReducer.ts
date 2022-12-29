import { handleActions } from 'redux-actions';

import { FetchCategoriesApiCall } from '../types';
import { API_CALL_FETCH_CATEGORIES } from '../actions/constants';
import { UpdateLocalCategoriesAction } from '../actions/types';

const initialState: FetchCategoriesApiCall = {
  data: [],
  error: null,
  loading: false
};

const fetchCategoriesApiCallReducer = handleActions<
  FetchCategoriesApiCall,
  UpdateLocalCategoriesAction['payload']
>({
  [API_CALL_FETCH_CATEGORIES]: (state, { payload }) => ({ ...state, ...payload })
}, initialState);

export default fetchCategoriesApiCallReducer;
