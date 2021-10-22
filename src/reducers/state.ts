import { GlobalState } from 'reducers';
import { Category, NullableCategory } from 'models';

export const categoriesSelector =
  (state: Readonly<GlobalState>): Category[] => state.categories;

export const currentCategorySelector =
  (state: Readonly<GlobalState>): NullableCategory => state.currentCategory;
