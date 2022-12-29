import { Category, Dish } from 'models';

import { GlobalState } from '../reducers';
import { FetchDishesApiCall } from '../reducers/fetchDishesApiCallReducer';

export const apiCallSelector =
  (state: Readonly<GlobalState>): FetchDishesApiCall => state.fetchDishesApiCall;

export const dataSelector =
  (state: Readonly<GlobalState>): Dish[] => state.fetchDishesApiCall.data;

export const includedDataSelector =
  (state: Readonly<GlobalState>): Category[] | undefined => state.fetchDishesApiCall.includedData;

export const errorSelector =
  (state: Readonly<GlobalState>): any => state.fetchDishesApiCall.error;

export const loadingSelector =
  (state: Readonly<GlobalState>): boolean => state.fetchDishesApiCall.loading;
