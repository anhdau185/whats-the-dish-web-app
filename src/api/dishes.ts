import axios from 'axios';

import { RawDish, PartialRawDish } from 'models';

import { BASE_URL } from './constants';
import {
  ApiCallPromise,
  FetchDishesApiOptions,
  GetDishApiOptions,
  SingleDishApiResponse,
  DishCollectionApiResponse
} from './types';

export const fetchDishes =
  (params: FetchDishesApiOptions = {}): ApiCallPromise<DishCollectionApiResponse> =>
    axios.get(`${BASE_URL}/dishes`, { params });

export const createDish = (dish: RawDish): ApiCallPromise<SingleDishApiResponse> =>
  axios.post(`${BASE_URL}/dishes`, dish);

export const getDish =
  (id: string, params: GetDishApiOptions = {}): ApiCallPromise<SingleDishApiResponse> =>
    axios.get(`${BASE_URL}/dishes/${id}`, { params });

export const updateDish =
  (id: string, dish: PartialRawDish): ApiCallPromise<SingleDishApiResponse> =>
    axios.patch(`${BASE_URL}/dishes/${id}`, dish);

export const deleteDish =
  (id: string): ApiCallPromise => axios.delete(`${BASE_URL}/dishes/${id}`);

export const likeDish = (id: string): ApiCallPromise<SingleDishApiResponse> =>
  axios.put(`${BASE_URL}/dishes/${id}/like`);

export const unlikeDish = (id: string): ApiCallPromise<SingleDishApiResponse> =>
  axios.put(`${BASE_URL}/dishes/${id}/unlike`);
