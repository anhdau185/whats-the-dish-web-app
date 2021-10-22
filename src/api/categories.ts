import axios, { AxiosResponse } from 'axios';

import { Category, RawCategory } from 'models';

import { CommonApiResponse, BASE_URL } from '.';

interface FetchCategoriesApiOptions {
  include_dishes?: boolean;
  order_by?: 'name' | 'title' | 'created_at' | 'updated_at';
  order_direction?: 'asc' | 'desc';
}

interface GetCategoryApiOptions {
  include_dishes?: boolean;
}

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
