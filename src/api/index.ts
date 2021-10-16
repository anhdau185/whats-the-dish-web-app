import axios, { AxiosResponse } from 'axios';

import { CategoryModel } from 'models';

interface NetworkResponse {
  error: boolean;
  message: string;
  [extraProps: string]: any;
}

type FetchCategoriesApiResponse =
  AxiosResponse<NetworkResponse & { categories: CategoryModel[] }>;

type CreateCategoryApiResponse =
  AxiosResponse<NetworkResponse & { createdCategory: CategoryModel }>;

type GetCategoryApiResponse =
  AxiosResponse<NetworkResponse & { category: CategoryModel }>;

type UpdateCategoryApiResponse =
  AxiosResponse<NetworkResponse & { updatedCategory: CategoryModel }>;

type DeleteCategoryApiResponse = AxiosResponse<NetworkResponse>;


const BASE_URL = 'https://whats-the-dish-api.herokuapp.com';

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
