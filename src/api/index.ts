import axios, { AxiosResponse } from 'axios';

import { CategoryModel } from 'models';

interface CommonApiResponse {
  included?: any;
  [extraProps: string]: any;
}

type FetchCategoriesApiResponse =
  AxiosResponse<CommonApiResponse & { data: CategoryModel[] }>;

type CreateCategoryApiResponse =
  AxiosResponse<CommonApiResponse & { data: CategoryModel }>;

type GetCategoryApiResponse =
  AxiosResponse<CommonApiResponse & { data: CategoryModel }>;

type UpdateCategoryApiResponse =
  AxiosResponse<CommonApiResponse & { data: CategoryModel }>;

type DeleteCategoryApiResponse = AxiosResponse<CommonApiResponse>;


// const BASE_URL = 'https://whats-the-dish-api.herokuapp.com';
const BASE_URL = 'http://127.0.0.1:5000/api/v1';

/* Categories REST APIs */

export const fetchCategories = (): Promise<FetchCategoriesApiResponse> =>
  axios.get(`${BASE_URL}/categories`);

export const createCategory =
  (category: CategoryModel): Promise<CreateCategoryApiResponse> =>
    axios.post(`${BASE_URL}/categories`, category);

export const getCategory =
  (name: string): Promise<GetCategoryApiResponse> =>
    axios.get(`${BASE_URL}/categories/${name}`);

export const updateCategory =
  (name: string, category: CategoryModel): Promise<UpdateCategoryApiResponse> =>
    axios.patch(`${BASE_URL}/categories/${name}`, category);

export const deleteCategory =
  (name: string): Promise<DeleteCategoryApiResponse> =>
    axios.delete(`${BASE_URL}/categories/${name}`);
