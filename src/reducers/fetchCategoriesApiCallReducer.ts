import { Reducer } from 'redux';

import { Category, Dish } from 'models';
import { ApiCallFetchCategoriesAction } from 'actions';
import { API_CALL_FETCH_CATEGORIES } from 'actions/types';

export interface FetchCategoriesApiCall {
  data: Category[];
  includedData?: Dish[];
  error: any;
  loading: boolean;
}

type FetchCategoriesApiCallReducer =
  Reducer<FetchCategoriesApiCall, ApiCallFetchCategoriesAction>;

const initialState: FetchCategoriesApiCall = {
  data: [],
  error: null,
  loading: false
};

const fetchCategoriesApiCallReducer: FetchCategoriesApiCallReducer =
  (prevState = initialState, action) => {
    switch (action.type) {
      case API_CALL_FETCH_CATEGORIES:
        return action.payload;
      default:
        return prevState;
    }
  };

export default fetchCategoriesApiCallReducer;
