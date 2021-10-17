import { Reducer } from 'redux';

import { Category } from 'models';
import {
  FetchCategoriesAction,
  CreateCategoryAction,
  UpdateCategoryAction,
  DeleteCategoryAction
} from 'actions';
import {
  FETCH_ALL_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from 'actions/types';

type CategoriesReducer = Reducer<
  Category[],
  FetchCategoriesAction | CreateCategoryAction | UpdateCategoryAction | DeleteCategoryAction
>;

const categoriesReducer: CategoriesReducer =
  (prevState = [], action) => {
    switch (action.type) {
      case FETCH_ALL_CATEGORIES:
        return action.payload;
      case CREATE_CATEGORY:
        return [...prevState, action.payload];
      case UPDATE_CATEGORY:
        return prevState.map(
          item => item.id === action.payload.id ? action.payload : item
        );
      case DELETE_CATEGORY:
        return prevState.filter(item => item.id !== action.payload);
      default:
        return prevState;
    }
  };

export default categoriesReducer;
