import { handleActions } from 'redux-actions';

import { FetchDishesApiCall } from 'appState/types';
import { UpdateLocalDishesAction } from 'appState/actions/types';
import { API_CALL_FETCH_DISHES } from 'appState/actions/constants';

const initialState: FetchDishesApiCall = {
  data: [],
  error: null,
  loading: false
};

const fetchDishesReducer = handleActions<
  FetchDishesApiCall,
  UpdateLocalDishesAction['payload']
>({
  [API_CALL_FETCH_DISHES]: (state, { payload }) => ({ ...state, ...payload })
}, initialState);

export default fetchDishesReducer;
