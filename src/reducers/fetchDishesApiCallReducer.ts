import { Reducer } from 'redux';

import { Category, Dish } from 'models';
import { ApiCallFetchDishesAction } from 'actions';
import { API_CALL_FETCH_DISHES } from 'actions/types';

export interface FetchDishesApiCall {
  data: Dish[];
  includedData?: Category[];
  error: any;
  loading: boolean;
}

type FetchDishesApiCallReducer =
  Reducer<FetchDishesApiCall, ApiCallFetchDishesAction>;

const initialState: FetchDishesApiCall = {
  data: [],
  error: null,
  loading: false
};

const fetchDishesApiCallReducer: FetchDishesApiCallReducer =
  (prevState = initialState, action) => {
    switch (action.type) {
      case API_CALL_FETCH_DISHES:
        return action.payload;
      default:
        return prevState;
    }
  };

export default fetchDishesApiCallReducer;
