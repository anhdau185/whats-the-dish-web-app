import { handleActions } from 'redux-actions';

import { FetchDishesApiCall } from '../types';
import { UpdateLocalDishesAction } from '../actions/types';
import { API_CALL_FETCH_DISHES } from '../actions/constants';

const initialState: FetchDishesApiCall = {
  data: [],
  error: null,
  loading: false
};

const fetchDishesApiCallReducer = handleActions<
  FetchDishesApiCall,
  UpdateLocalDishesAction['payload']
>({
  [API_CALL_FETCH_DISHES]: (state, { payload }) => ({ ...state, ...payload })
}, initialState);

export default fetchDishesApiCallReducer;
