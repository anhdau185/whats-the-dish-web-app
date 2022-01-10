import { SetAppLoadingAction } from './setAppLoadingAC';
import { ApiCallFetchCategoriesAction } from './fetchCategoriesAC';
import { ApiCallFetchDishesAction } from './fetchDishesAC';

type AppAction = SetAppLoadingAction
  | ApiCallFetchCategoriesAction
  | ApiCallFetchDishesAction;

export type {
  SetAppLoadingAction,
  ApiCallFetchCategoriesAction,
  ApiCallFetchDishesAction,
  AppAction
};
