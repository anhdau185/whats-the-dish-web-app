import { Action, Dispatch } from 'redux';

import { CategoryModel, NullableCategoryModel } from 'models';

/* Action creators */
export type ActionCreator<A extends Action = Action> =
  (...args: any[]) => A;

export type AsyncActionCreator<A extends Action = Action> =
  (onCompletion: (() => any) | null, ...args: any[]) =>
    (dispatch: Dispatch<A>) => void;

/* Action for `testData` */
export type TestDataAction = Action<string>;

/* Actions for `categories` */
export interface FetchCategoriesAction extends Action<string> {
  payload: CategoryModel[];
}

export interface CreateCategoryAction extends Action<string> {
  payload: CategoryModel;
}

export interface GetCategoryAction extends Action<string> {
  payload: CategoryModel;
}

export interface UpdateCategoryAction extends Action<string> {
  payload: CategoryModel;
}

export interface DeleteCategoryAction extends Action<string> {
  payload: string;
}

export type CategoriesAction =
  FetchCategoriesAction
  | CreateCategoryAction
  | GetCategoryAction
  | UpdateCategoryAction
  | DeleteCategoryAction;

/* Actions for `currentCategory` */
export interface SetCurrentCategoryAction extends Action<string> {
  payload: CategoryModel;
}

export type RemoveCurrentCategoryAction = Action<string>;

export interface CurrentCategoryAction extends Action<string> {
  payload: NullableCategoryModel;
}

/* Combine all actions into one for ease of use */
export type AppAction =
  TestDataAction | CategoriesAction | CurrentCategoryAction;
