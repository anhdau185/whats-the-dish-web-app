import { createAction } from 'redux-actions';

import {
  SET_APP_LOADING,
  FETCH_DISHES_API,
  FETCH_CATEGORIES_API,
  UPDATE_API_CALL_FETCH_DISHES,
  UPDATE_API_CALL_FETCH_CATEGORIES
} from './constants';
import {
  SetAppLoadingAction,
  FetchDishesAction,
  UpdateLocalDishesAction,
  FetchCategoriesAction,
  UpdateLocalCategoriesAction
} from './types';

export const setAppLoadingAC = createAction(SET_APP_LOADING) as ActionCreator<SetAppLoadingAction>;

export const fetchDishesAC = createAction(FETCH_DISHES_API) as ActionCreator<FetchDishesAction>;

export const updateLocalDishesAC = createAction(
  UPDATE_API_CALL_FETCH_DISHES
) as ActionCreator<UpdateLocalDishesAction>;

export const fetchCategoriesAC = createAction(FETCH_CATEGORIES_API) as ActionCreator<FetchCategoriesAction>;

export const updateLocalCategoriesAC = createAction(
  UPDATE_API_CALL_FETCH_CATEGORIES
) as ActionCreator<UpdateLocalCategoriesAction>;
