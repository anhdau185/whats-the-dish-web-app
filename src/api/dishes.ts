import axios from 'axios';

import { Dish, RawDish, Category, PartialRawDish } from 'models';

import { CommonApiResponse, ApiCallPromise, BASE_URL } from '.';

export interface FetchDishesApiOptions {
  include_categories?: boolean;
  order_by?: 'name' | 'title' | 'created_at' | 'updated_at';
  order_direction?: 'asc' | 'desc';
}

export interface GetDishApiOptions {
  include_categories?: boolean;
}

export interface DishCollectionApiResponse extends CommonApiResponse {
  data: Dish[];
  included?: Category[];
}

export interface SingleDishApiResponse extends CommonApiResponse {
  data: Dish;
  included?: Category[];
}

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
