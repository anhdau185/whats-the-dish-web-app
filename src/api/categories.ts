import axios from 'axios';

import { RawCategory, PartialRawCategory } from 'models';

import { BASE_URL } from './constants';
import {
  ApiCallPromise,
  FetchCategoriesApiOptions,
  GetCategoryApiOptions,
  CategoryCollectionApiResponse,
  SingleCategoryApiResponse
} from './types';

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
