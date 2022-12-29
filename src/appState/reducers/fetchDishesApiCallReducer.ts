import { handleActions } from 'redux-actions';

import { Category, Dish } from 'models';

import { UpdateLocalDishesAction } from '../actions/types';
import { API_CALL_FETCH_DISHES } from '../actions/constants';

export interface FetchDishesApiCall {
  data: Dish[];
  includedData?: Category[];
  error: any;
  loading: boolean;
}

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
