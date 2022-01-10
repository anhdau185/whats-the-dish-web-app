import { Reducer } from 'redux';

import { NullableCategory } from 'models';
import {
  RemoveCurrentCategoryAction
} from 'actions';
import {
  REMOVE_CURRENT_CATEGORY
} from 'actions/types';

export type CurrentCategoryReducer =
  Reducer<NullableCategory, RemoveCurrentCategoryAction>;

const currentCategoryReducer: CurrentCategoryReducer =
  (prevState = null, action) => {
    switch (action.type) {
      case REMOVE_CURRENT_CATEGORY:
        return null;
      default:
        return prevState;
    }
  };

export default currentCategoryReducer;
