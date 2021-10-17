import axios, { AxiosResponse } from 'axios';

import { Category, RawCategory } from 'models';

interface CommonApiResponse {
  included?: any;
  [extraProps: string]: any;
}

type FetchCategoriesApiResponse =
  AxiosResponse<CommonApiResponse & { data: Category[] }>;

type CreateCategoryApiResponse =
  AxiosResponse<CommonApiResponse & { data: Category }>;

type GetCategoryApiResponse =
  AxiosResponse<CommonApiResponse & { data: Category }>;

type UpdateCategoryApiResponse =
  AxiosResponse<CommonApiResponse & { data: Category }>;

type DeleteCategoryApiResponse = AxiosResponse<CommonApiResponse>;


// const BASE_URL = 'https://whats-the-dish-api.herokuapp.com';
const BASE_URL = 'http://127.0.0.1:5000/api/v1';

/* Categories REST APIs */

export const fetchCategories = (): Promise<FetchCategoriesApiResponse> =>
  axios.get(`${BASE_URL}/categories`);

export const createCategory =
  (category: RawCategory): Promise<CreateCategoryApiResponse> =>
    axios.post(`${BASE_URL}/categories`, category);

export const getCategory =
  (id: string): Promise<GetCategoryApiResponse> =>
    axios.get(`${BASE_URL}/categories/${id}`);

export const updateCategory =
  (id: string, category: RawCategory): Promise<UpdateCategoryApiResponse> =>
    axios.patch(`${BASE_URL}/categories/${id}`, category);

export const deleteCategory =
  (id: string): Promise<DeleteCategoryApiResponse> =>
    axios.delete(`${BASE_URL}/categories/${id}`);
