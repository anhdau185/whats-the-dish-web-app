import { Reducer } from 'redux';

import { Category } from 'models';
import {
  FetchCategoriesAction,
  UpdateCategoryAction
} from 'actions';
import {
  FETCH_ALL_CATEGORIES,
  UPDATE_CATEGORY
} from 'actions/types';

type CategoriesReducer = Reducer<
  Category[],
  FetchCategoriesAction | UpdateCategoryAction
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
      default:
        return prevState;
    }
  };

export default categoriesReducer;
