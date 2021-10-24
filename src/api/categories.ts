import axios, { AxiosResponse } from 'axios';

import { Category, RawCategory, Dish } from 'models';

import { CommonApiResponse, BASE_URL } from '.';

export interface FetchCategoriesApiOptions {
  include_dishes?: boolean;
  order_by?: 'name' | 'title' | 'created_at' | 'updated_at';
  order_direction?: 'asc' | 'desc';
}

export interface GetCategoryApiOptions {
  include_dishes?: boolean;
}

export interface CategoryCollectionApiResponse extends Omit<CommonApiResponse, 'included'> {
  data: Category[];
  included?: Dish[];
}

export interface SingleCategoryApiResponse extends Omit<CommonApiResponse, 'included'> {
  data: Category;
  included?: Dish[];
}

export type FetchCategoriesApiResponse = AxiosResponse<CategoryCollectionApiResponse>;
export type CreateCategoryApiResponse = AxiosResponse<SingleCategoryApiResponse>;
export type GetCategoryApiResponse = AxiosResponse<SingleCategoryApiResponse>;
export type UpdateCategoryApiResponse = AxiosResponse<SingleCategoryApiResponse>;
export type DeleteCategoryApiResponse = AxiosResponse<CommonApiResponse>;

export const fetchCategories =
  (params: FetchCategoriesApiOptions = {}): Promise<FetchCategoriesApiResponse> =>
    axios.get(`${BASE_URL}/categories`, { params });

export const createCategory =
  (category: RawCategory): Promise<CreateCategoryApiResponse> =>
    axios.post(`${BASE_URL}/categories`, category);

export const getCategory =
  (id: string, params: GetCategoryApiOptions = {}): Promise<GetCategoryApiResponse> =>
    axios.get(`${BASE_URL}/categories/${id}`, { params });

export const updateCategory =
  (id: string, category: RawCategory): Promise<UpdateCategoryApiResponse> =>
    axios.patch(`${BASE_URL}/categories/${id}`, category);

export const deleteCategory =
  (id: string): Promise<DeleteCategoryApiResponse> => axios.delete(`${BASE_URL}/categories/${id}`);
