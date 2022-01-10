import { Reducer } from 'redux';

import { Category } from 'models';
import {
  UpdateCategoryAction
} from 'actions';
import {
  UPDATE_CATEGORY
} from 'actions/types';

type CategoriesReducer = Reducer<
  Category[],
  UpdateCategoryAction
>;

const categoriesReducer: CategoriesReducer =
  (prevState = [], action) => {
    switch (action.type) {
      case UPDATE_CATEGORY:
        return prevState.map(
          item => item.id === action.payload.id ? action.payload : item
        );
      default:
        return prevState;
    }
  };

export default categoriesReducer;
