import { FetchCategoriesAction } from './fetchAllCategories';
import { CreateCategoryAction } from './createCategory';
import { UpdateCategoryAction } from './updateCategory';
import { DeleteCategoryAction } from './deleteCategory';
import { SetCurrentCategoryAction } from './setCurrentCategory';
import { RemoveCurrentCategoryAction } from './removeCurrentCategory';
import { IncrementTestDataAction } from './incrementTestData';
import { DecrementTestDataAction } from './decrementTestData';

type AppAction = FetchCategoriesAction
  | CreateCategoryAction
  | UpdateCategoryAction
  | DeleteCategoryAction
  | SetCurrentCategoryAction
  | RemoveCurrentCategoryAction
  | IncrementTestDataAction
  | DecrementTestDataAction;

export type {
  FetchCategoriesAction,
  CreateCategoryAction,
  UpdateCategoryAction,
  DeleteCategoryAction,
  SetCurrentCategoryAction,
  RemoveCurrentCategoryAction,
  IncrementTestDataAction,
  DecrementTestDataAction,
  AppAction
};
