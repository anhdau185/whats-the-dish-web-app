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

// local host for development
// export const BASE_URL = 'http://127.0.0.1:5000/api/v1';

// heroku production host
export const BASE_URL = 'https://whats-the-dish-api.herokuapp.com/api/v1';

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
