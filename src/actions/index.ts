import { UpdateCategoryAction } from './updateCategory';
import { IncrementTestDataAction } from './incrementTestData';
import { DecrementTestDataAction } from './decrementTestData';
import { SetCurrentDishAction } from './setCurrentDish';
import { RemoveCurrentDishAction } from './removeCurrentDish';
import { EnableAppLoadingAction } from './enableAppLoading';
import { DisableAppLoadingAction } from './disableAppLoading';
import { ApiCallFetchCategoriesAction } from './fetchCategoriesAC';

type AppAction = UpdateCategoryAction
  | IncrementTestDataAction
  | DecrementTestDataAction
  | SetCurrentDishAction
  | RemoveCurrentDishAction
  | EnableAppLoadingAction
  | DisableAppLoadingAction
  | ApiCallFetchCategoriesAction;

export type {
  UpdateCategoryAction,
  IncrementTestDataAction,
  DecrementTestDataAction,
  SetCurrentDishAction,
  RemoveCurrentDishAction,
  EnableAppLoadingAction,
  DisableAppLoadingAction,
  AppAction,
  ApiCallFetchCategoriesAction
};
