import { Category, Dish } from 'models';

import { GlobalState } from '../reducers';
import { FetchCategoriesApiCall } from '../reducers/fetchCategoriesApiCallReducer';

export const apiCallSelector =
  (state: Readonly<GlobalState>): FetchCategoriesApiCall => state.fetchCategoriesApiCall;

export const dataSelector =
  (state: Readonly<GlobalState>): Category[] => state.fetchCategoriesApiCall.data;

export const includedDataSelector =
  (state: Readonly<GlobalState>): Dish[] | undefined => state.fetchCategoriesApiCall.includedData;

export const errorSelector =
  (state: Readonly<GlobalState>): any => state.fetchCategoriesApiCall.error;

export const loadingSelector =
  (state: Readonly<GlobalState>): boolean => state.fetchCategoriesApiCall.loading;
