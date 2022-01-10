import { Reducer } from 'redux';

import { Category } from 'models';
import {
  FetchCategoriesAction,
  UpdateCategoryAction,
  DeleteCategoryAction
} from 'actions';
import {
  FETCH_ALL_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from 'actions/types';

type CategoriesReducer = Reducer<
  Category[],
  FetchCategoriesAction | UpdateCategoryAction | DeleteCategoryAction
>;

const categoriesReducer: CategoriesReducer =
  (prevState = [], action) => {
    switch (action.type) {
      case FETCH_ALL_CATEGORIES:
        return action.payload;
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
