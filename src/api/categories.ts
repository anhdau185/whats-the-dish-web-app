import axios from 'axios';

import { Category, RawCategory, Dish, PartialRawCategory } from 'models';

import { CommonApiResponse, ApiCallPromise, BASE_URL } from '.';

export interface FetchCategoriesApiOptions {
  include_dishes?: boolean;
  order_by?: 'name' | 'title' | 'created_at' | 'updated_at';
  order_direction?: 'asc' | 'desc';
}

export interface GetCategoryApiOptions {
  include_dishes?: boolean;
}

export interface CategoryCollectionApiResponse extends CommonApiResponse {
  data: Category[];
  included?: Dish[];
}

export interface SingleCategoryApiResponse extends CommonApiResponse {
  data: Category;
  included?: Dish[];
}

export const fetchCategories =
  (params: FetchCategoriesApiOptions = {}): ApiCallPromise<CategoryCollectionApiResponse> =>
    axios.get(`${BASE_URL}/categories`, { params });

export const createCategory =
  (category: RawCategory): ApiCallPromise<SingleCategoryApiResponse> =>
    axios.post(`${BASE_URL}/categories`, category);

export const getCategory =
  (id: string, params: GetCategoryApiOptions = {}): ApiCallPromise<SingleCategoryApiResponse> =>
    axios.get(`${BASE_URL}/categories/${id}`, { params });

export const updateCategory =
  (id: string, category: PartialRawCategory): ApiCallPromise<SingleCategoryApiResponse> =>
    axios.patch(`${BASE_URL}/categories/${id}`, category);

export const deleteCategory =
  (id: string): ApiCallPromise => axios.delete(`${BASE_URL}/categories/${id}`);
