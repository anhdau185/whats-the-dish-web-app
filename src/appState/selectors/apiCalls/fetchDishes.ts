import { Category, Dish } from 'models';

import { FetchDishesApiCall } from 'appState/types';

export const apiCallSelector =
  (state: Readonly<GlobalState>): FetchDishesApiCall => state.apiCalls.fetchDishes;

export const dataSelector =
  (state: Readonly<GlobalState>): Dish[] => state.apiCalls.fetchDishes.data;

export const includedDataSelector =
  (state: Readonly<GlobalState>): Category[] | undefined => state.apiCalls.fetchDishes.includedData;

export const errorSelector =
  (state: Readonly<GlobalState>): any => state.apiCalls.fetchDishes.error;

export const loadingSelector =
  (state: Readonly<GlobalState>): boolean => state.apiCalls.fetchDishes.loading;
