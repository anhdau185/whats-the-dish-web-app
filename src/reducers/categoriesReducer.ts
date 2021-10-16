import { Reducer, AnyAction } from 'redux';
import { CategoryModel } from 'models';

import { CategoriesAction } from 'actions/declarations';
import {
  FETCH_ALL_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from 'actions/types';

const categoriesReducer: Reducer<CategoryModel[], CategoriesAction> =
  (prevState = [], action: AnyAction): CategoryModel[] => {
    switch (action.type) {
      case FETCH_ALL_CATEGORIES:
        return action.payload;
      case CREATE_CATEGORY:
        return [...prevState, action.payload];
      case UPDATE_CATEGORY:
        return prevState.map(
          (item: CategoryModel) =>
            item.name === action.payload.name ? action.payload : item
        );
      case DELETE_CATEGORY:
        return prevState.filter(
          (item: CategoryModel) => item.name !== action.payload
        );
      default:
        return prevState;
    }
  };

export default categoriesReducer;
