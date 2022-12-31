import { handleActions } from 'redux-actions';

import { FetchDishesApiCall } from 'appState/types';
import { UpdateLocalDishesAction } from 'appState/actions/types';
import { UPDATE_LOCAL_DISHES } from 'appState/actions/constants';

const initialState: FetchDishesApiCall = {
  data: [],
  error: null,
  loading: false
};

const fetchDishesReducer = handleActions<
  FetchDishesApiCall,
  UpdateLocalDishesAction['payload']
>({
  [UPDATE_LOCAL_DISHES]: (state, { payload }) => ({ ...state, ...payload })
}, initialState);

export default fetchDishesReducer;
