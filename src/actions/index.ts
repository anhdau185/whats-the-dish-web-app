import { SetCurrentDishAction } from './setCurrentDish';
import { RemoveCurrentDishAction } from './removeCurrentDish';
import { SetAppLoadingAction } from './setAppLoadingAC';
import { ApiCallFetchCategoriesAction } from './fetchCategoriesAC';

type AppAction = SetCurrentDishAction
  | RemoveCurrentDishAction
  | SetAppLoadingAction
  | ApiCallFetchCategoriesAction;

export type {
  SetCurrentDishAction,
  RemoveCurrentDishAction,
  SetAppLoadingAction,
  ApiCallFetchCategoriesAction,
  AppAction
};
