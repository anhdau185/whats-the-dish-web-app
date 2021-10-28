import axios, { AxiosResponse } from 'axios';

import { Dish, RawDish, Category } from 'models';

import { CommonApiResponse, BASE_URL } from '.';

export interface FetchDishesApiOptions {
  include_categories?: boolean;
  order_by?: 'name' | 'title' | 'created_at' | 'updated_at';
  order_direction?: 'asc' | 'desc';
}

export interface GetDishApiOptions {
  include_categories?: boolean;
}

export interface DishCollectionApiResponse extends Omit<CommonApiResponse, 'included'> {
  data: Dish[];
  included?: Category[];
}

export interface SingleDishApiResponse extends Omit<CommonApiResponse, 'included'> {
  data: Dish;
  included?: Category[];
}

export type FetchDishesApiResponse = AxiosResponse<DishCollectionApiResponse>;
export type GetDishApiResponse = AxiosResponse<SingleDishApiResponse>;
export type CreateDishApiResponse = AxiosResponse<SingleDishApiResponse>;
export type UpdateDishApiResponse = AxiosResponse<SingleDishApiResponse>;
export type DeleteDishApiResponse = AxiosResponse<CommonApiResponse>;

export const fetchDishes =
  (params: FetchDishesApiOptions = {}): Promise<FetchDishesApiResponse> =>
    axios.get(`${BASE_URL}/dishes`, { params });

export const createDish =
  (dish: RawDish): Promise<CreateDishApiResponse> =>
    axios.post(`${BASE_URL}/dishes`, dish);

export const getDish =
  (id: string, params: GetDishApiOptions = {}): Promise<GetDishApiResponse> =>
    axios.get(`${BASE_URL}/dishes/${id}`, { params });

export const updateDish =
  (id: string, dish: RawDish): Promise<UpdateDishApiResponse> =>
    axios.patch(`${BASE_URL}/dishes/${id}`, dish);

export const deleteDish =
  (id: string): Promise<DeleteDishApiResponse> => axios.delete(`${BASE_URL}/dishes/${id}`);
