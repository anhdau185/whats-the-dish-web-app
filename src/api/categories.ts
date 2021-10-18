import axios, { AxiosResponse } from 'axios';

import { Category, RawCategory } from 'models';

import { CommonApiResponse, BASE_URL } from '.';

interface CategoryCollectionApiResponse extends CommonApiResponse {
  data: Category[];
}

interface SingleCategoryApiResponse extends CommonApiResponse {
  data: Category;
}

type FetchCategoriesApiResponse = AxiosResponse<CategoryCollectionApiResponse>;
type CreateCategoryApiResponse = AxiosResponse<SingleCategoryApiResponse>;
type GetCategoryApiResponse = AxiosResponse<SingleCategoryApiResponse>;
type UpdateCategoryApiResponse = AxiosResponse<SingleCategoryApiResponse>;
type DeleteCategoryApiResponse = AxiosResponse<CommonApiResponse>;

export const fetchCategories = (): Promise<FetchCategoriesApiResponse> =>
  axios.get(`${BASE_URL}/categories`);

export const createCategory =
  (category: RawCategory): Promise<CreateCategoryApiResponse> =>
    axios.post(`${BASE_URL}/categories`, category);

export const getCategory =
  (id: string): Promise<GetCategoryApiResponse> => axios.get(`${BASE_URL}/categories/${id}`);

export const updateCategory =
  (id: string, category: RawCategory): Promise<UpdateCategoryApiResponse> =>
    axios.patch(`${BASE_URL}/categories/${id}`, category);

export const deleteCategory =
  (id: string): Promise<DeleteCategoryApiResponse> => axios.delete(`${BASE_URL}/categories/${id}`);
