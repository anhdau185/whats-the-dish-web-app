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
  deleteDish
} from './dishes';

// export const BASE_URL = 'https://whats-the-dish-api.herokuapp.com'; // production host
export const BASE_URL = 'http://127.0.0.1:5000/api/v1';  // local host

export interface CommonApiResponse {
  included?: unknown;
  [extraProps: string]: unknown;
}

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
  deleteDish
};
