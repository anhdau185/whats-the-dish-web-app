import {
  fetchCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
} from './categories';

// export const BASE_URL = 'https://whats-the-dish-api.herokuapp.com';
export const BASE_URL = 'http://127.0.0.1:5000/api/v1';

export interface CommonApiResponse {
  included?: unknown;
  [extraProps: string]: unknown;
}

export {
  fetchCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
};
