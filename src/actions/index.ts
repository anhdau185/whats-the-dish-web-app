import { FetchCategoriesAction } from './fetchAllCategories';
import { CreateCategoryAction } from './createCategory';
import { UpdateCategoryAction } from './updateCategory';
import { DeleteCategoryAction } from './deleteCategory';
import { SetCurrentCategoryAction } from './setCurrentCategory';
import { RemoveCurrentCategoryAction } from './removeCurrentCategory';
import { IncrementTestDataAction } from './incrementTestData';
import { DecrementTestDataAction } from './decrementTestData';
import { SetCurrentDishAction } from './setCurrentDish';
import { RemoveCurrentDishAction } from './removeCurrentDish';
import { EnableAppLoadingAction } from './enableAppLoading';
import { DisableAppLoadingAction } from './disableAppLoading';
import { ApiCallFetchCategoriesAction } from './fetchCategoriesAC';

type AppAction = FetchCategoriesAction
  | CreateCategoryAction
  | UpdateCategoryAction
  | DeleteCategoryAction
  | SetCurrentCategoryAction
  | RemoveCurrentCategoryAction
  | IncrementTestDataAction
  | DecrementTestDataAction
  | SetCurrentDishAction
  | RemoveCurrentDishAction
  | EnableAppLoadingAction
  | DisableAppLoadingAction
  | ApiCallFetchCategoriesAction;

export type {
  FetchCategoriesAction,
  CreateCategoryAction,
  UpdateCategoryAction,
  DeleteCategoryAction,
  SetCurrentCategoryAction,
  RemoveCurrentCategoryAction,
  IncrementTestDataAction,
  DecrementTestDataAction,
  SetCurrentDishAction,
  RemoveCurrentDishAction,
  EnableAppLoadingAction,
  DisableAppLoadingAction,
  AppAction,
  ApiCallFetchCategoriesAction
};
