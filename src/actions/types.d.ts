import { FetchDishesApiOptions } from 'api/dishes';
import { FetchCategoriesApiOptions } from 'api/categories';
import { FetchDishesApiCall } from 'reducers/fetchDishesApiCallReducer';
import { FetchCategoriesApiCall } from 'reducers/fetchCategoriesApiCallReducer';

import {
  SET_APP_LOADING,
  FETCH_DISHES_API,
  FETCH_CATEGORIES_API,
  API_CALL_FETCH_DISHES,
  API_CALL_FETCH_CATEGORIES
} from './constants';

export type SetAppLoadingAction = Action<typeof SET_APP_LOADING, boolean>;

export type FetchDishesAction = Action<
  typeof FETCH_DISHES_API,
  {
    params?: FetchDishesApiOptions;
    onSuccess?: (value: FetchDishesApiCall['data']) => void;
    onFailure?: (value: FetchDishesApiCall['error']) => void;
    onCompletion?: () => void;
  }
>;

export type UpdateLocalDishesAction = Action<
  typeof API_CALL_FETCH_DISHES,
  Partial<FetchDishesApiCall>
>;

export type FetchCategoriesAction = Action<
  typeof FETCH_CATEGORIES_API,
  {
    params?: FetchCategoriesApiOptions;
    onSuccess?: (value: FetchCategoriesApiCall['data']) => void;
    onFailure?: (value: FetchCategoriesApiCall['error']) => void;
    onCompletion?: () => void;
  }
>;

export type UpdateLocalCategoriesAction = Action<
  typeof API_CALL_FETCH_CATEGORIES,
  Partial<FetchCategoriesApiCall>
>;
