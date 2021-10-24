import { GlobalState } from 'reducers';
import { Category, NullableCategory, NullableDish } from 'models';

export const categoriesSelector =
  (state: Readonly<GlobalState>): Category[] => state.categories;

export const currentCategorySelector =
  (state: Readonly<GlobalState>): NullableCategory => state.currentCategory;

export const currentDishSelector =
  (state: Readonly<GlobalState>): NullableDish => state.currentDish;
