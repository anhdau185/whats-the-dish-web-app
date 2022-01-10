import { SetCurrentDishAction } from './setCurrentDish';
import { RemoveCurrentDishAction } from './removeCurrentDish';
import { SetAppLoadingAction } from './setAppLoadingAC';
import { ApiCallFetchCategoriesAction } from './fetchCategoriesAC';
import { ApiCallFetchDishesAction } from './fetchDishesAC';

type AppAction = SetCurrentDishAction
  | RemoveCurrentDishAction
  | SetAppLoadingAction
  | ApiCallFetchCategoriesAction
  | ApiCallFetchDishesAction;

export type {
  SetCurrentDishAction,
  RemoveCurrentDishAction,
  SetAppLoadingAction,
  ApiCallFetchCategoriesAction,
  ApiCallFetchDishesAction,
  AppAction
};
