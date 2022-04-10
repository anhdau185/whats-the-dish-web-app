import { AxiosResponse } from 'axios';

import { OneOrMany } from 'utils';
import { Category, Dish } from 'models';

import {
  fetchCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
} from './categories';
import {
  fetchDishes,
  createDish,
  getDish,
  updateDish,
  deleteDish,
  likeDish,
  unlikeDish
} from './dishes';

// local host for development
// export const BASE_URL = 'http://localhost:5000/api/v1';

// heroku production host
export const BASE_URL = 'https://whats-the-dish-api.herokuapp.com/api/v1';

export interface CommonApiResponse {
  data?: OneOrMany<Category> | OneOrMany<Dish>;
  included?: Category[] | Dish[];
  [extraProps: string]: unknown;
}

export type ApiCallPromise<
  T extends CommonApiResponse = CommonApiResponse
> = Promise<AxiosResponse<T>>;

export {
  fetchCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  fetchDishes,
  createDish,
  getDish,
  updateDish,
  deleteDish,
  likeDish,
  unlikeDish
};
