import { Category, Dish } from 'models';

import { FetchCategoriesApiCall } from 'appState/types';

export const apiCallSelector =
  (state: Readonly<GlobalState>): FetchCategoriesApiCall => state.apiCalls.fetchCategories;

export const dataSelector =
  (state: Readonly<GlobalState>): Category[] => state.apiCalls.fetchCategories.data;

export const includedDataSelector =
  (state: Readonly<GlobalState>): Dish[] | undefined => state.apiCalls.fetchCategories.includedData;

export const errorSelector =
  (state: Readonly<GlobalState>): any => state.apiCalls.fetchCategories.error;

export const loadingSelector =
  (state: Readonly<GlobalState>): boolean => state.apiCalls.fetchCategories.loading;
