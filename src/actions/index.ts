import { SetCurrentDishAction } from './setCurrentDish';
import { RemoveCurrentDishAction } from './removeCurrentDish';
import { EnableAppLoadingAction } from './enableAppLoading';
import { DisableAppLoadingAction } from './disableAppLoading';
import { SetAppLoadingAction } from './setAppLoadingAC';
import { ApiCallFetchCategoriesAction } from './fetchCategoriesAC';

type AppAction = SetCurrentDishAction
  | RemoveCurrentDishAction
  | EnableAppLoadingAction
  | DisableAppLoadingAction
  | SetAppLoadingAction
  | ApiCallFetchCategoriesAction;

export type {
  SetCurrentDishAction,
  RemoveCurrentDishAction,
  EnableAppLoadingAction,
  DisableAppLoadingAction,
  SetAppLoadingAction,
  ApiCallFetchCategoriesAction,
  AppAction
};
