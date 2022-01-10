import { GlobalState } from 'reducers';
import { Category, NullableDish } from 'models';

export const categoriesSelector =
  (state: Readonly<GlobalState>): Category[] => state.categories;

export const currentDishSelector =
  (state: Readonly<GlobalState>): NullableDish => state.currentDish;

export const appLoadingSelector =
  (state: Readonly<GlobalState>): boolean => state.appLoading;
