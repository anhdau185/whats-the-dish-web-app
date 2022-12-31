import { FetchDishesApiOptions } from 'api/dishes';
import { FetchCategoriesApiOptions } from 'api/categories';
import { FetchDishesApiCall } from 'appState/types';
import { FetchCategoriesApiCall } from 'appState/types';

import {
  SET_APP_LOADING,
  FETCH_COMPLETED,
  FETCH_FAILED,
  FETCH_DISHES_API,
  FETCH_CATEGORIES_API,
  UPDATE_API_CALL_FETCH_DISHES,
  UPDATE_API_CALL_FETCH_CATEGORIES
} from './constants';

export declare type SetAppLoadingAction = Action<typeof SET_APP_LOADING, boolean>;

export declare type FetchCompletedAction = Action<
  typeof FETCH_COMPLETED,
  {
    apiName: string;
    data: any;
    [extraProps: string]: unknown;
  }
>;

export declare type FetchFailedAction = Action<
  typeof FETCH_FAILED,
  {
    apiName: string;
    error: any;
    [extraProps: string]: unknown;
  }
>;

export declare type FetchDishesAction = Action<
  typeof FETCH_DISHES_API,
  { params?: FetchDishesApiOptions }
>;

export declare type UpdateLocalDishesAction = Action<
  typeof UPDATE_API_CALL_FETCH_DISHES,
  Partial<FetchDishesApiCall>
>;

export declare type FetchCategoriesAction = Action<
  typeof FETCH_CATEGORIES_API,
  { params?: FetchCategoriesApiOptions }
>;

export declare type UpdateLocalCategoriesAction = Action<
  typeof UPDATE_API_CALL_FETCH_CATEGORIES,
  Partial<FetchCategoriesApiCall>
>;
