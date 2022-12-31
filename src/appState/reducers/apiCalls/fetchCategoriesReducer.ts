import { handleActions } from 'redux-actions';

import { FetchCategoriesApiCall } from 'appState/types';
import { UpdateLocalCategoriesAction } from 'appState/actions/types';
import { UPDATE_API_CALL_FETCH_CATEGORIES } from 'appState/actions/constants';

const initialState: FetchCategoriesApiCall = {
  data: [],
  error: null,
  loading: false
};

const fetchCategoriesReducer = handleActions<
  FetchCategoriesApiCall,
  UpdateLocalCategoriesAction['payload']
>({
  [UPDATE_API_CALL_FETCH_CATEGORIES]: (state, { payload }) => ({ ...state, ...payload })
}, initialState);

export default fetchCategoriesReducer;
