import { FetchDishesApiOptions } from 'api/dishes';
import { FetchCategoriesApiOptions } from 'api/categories';
import { FetchDishesApiCall } from 'appState/types';
import { FetchCategoriesApiCall } from 'appState/types';

import {
  SET_APP_LOADING,
  FETCH_DISHES_API,
  FETCH_CATEGORIES_API,
  API_CALL_FETCH_DISHES,
  API_CALL_FETCH_CATEGORIES
} from './constants';

export declare type SetAppLoadingAction = Action<typeof SET_APP_LOADING, boolean>;

export declare type FetchDishesAction = Action<
  typeof FETCH_DISHES_API,
  {
    params?: FetchDishesApiOptions;
    onSuccess?: (value: FetchDishesApiCall['data']) => void;
    onFailure?: (value: FetchDishesApiCall['error']) => void;
    onCompletion?: () => void;
  }
>;

export declare type UpdateLocalDishesAction = Action<
  typeof API_CALL_FETCH_DISHES,
  Partial<FetchDishesApiCall>
>;

export declare type FetchCategoriesAction = Action<
  typeof FETCH_CATEGORIES_API,
  {
    params?: FetchCategoriesApiOptions;
    onSuccess?: (value: FetchCategoriesApiCall['data']) => void;
    onFailure?: (value: FetchCategoriesApiCall['error']) => void;
    onCompletion?: () => void;
  }
>;

export declare type UpdateLocalCategoriesAction = Action<
  typeof API_CALL_FETCH_CATEGORIES,
  Partial<FetchCategoriesApiCall>
>;
