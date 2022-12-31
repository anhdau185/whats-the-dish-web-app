import { createAction } from 'redux-actions';

import {
  SET_APP_LOADING,
  FETCH_COMPLETED,
  FETCH_FAILED,
  FETCH_DISHES_API,
  FETCH_CATEGORIES_API,
  UPDATE_LOCAL_DISHES,
  UPDATE_LOCAL_CATEGORIES
} from './constants';
import {
  SetAppLoadingAction,
  FetchCompletedAction,
  FetchFailedAction,
  FetchDishesAction,
  UpdateLocalDishesAction,
  FetchCategoriesAction,
  UpdateLocalCategoriesAction
} from './types';

export const setAppLoadingAC = createAction(SET_APP_LOADING) as ActionCreator<SetAppLoadingAction>;

export const fetchCompletedAC = createAction(FETCH_COMPLETED) as ActionCreator<FetchCompletedAction>;

export const fetchFailedAC = createAction(FETCH_FAILED) as ActionCreator<FetchFailedAction>;

export const fetchDishesAC = createAction(FETCH_DISHES_API) as ActionCreator<FetchDishesAction>;

export const updateLocalDishesAC = createAction(UPDATE_LOCAL_DISHES) as ActionCreator<UpdateLocalDishesAction>;

export const fetchCategoriesAC = createAction(FETCH_CATEGORIES_API) as ActionCreator<FetchCategoriesAction>;

export const updateLocalCategoriesAC = createAction(UPDATE_LOCAL_CATEGORIES) as ActionCreator<UpdateLocalCategoriesAction>;
