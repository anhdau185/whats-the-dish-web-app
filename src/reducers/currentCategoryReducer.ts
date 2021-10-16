import { Reducer } from 'redux';

import { NullableCategoryModel } from 'models';
import {
  SetCurrentCategoryAction,
  RemoveCurrentCategoryAction
} from 'actions';
import {
  SET_CURRENT_CATEGORY,
  REMOVE_CURRENT_CATEGORY
} from 'actions/types';

export type CurrentCategoryReducer =
  Reducer<NullableCategoryModel, SetCurrentCategoryAction | RemoveCurrentCategoryAction>;

const currentCategoryReducer: CurrentCategoryReducer =
  (prevState = null, action) => {
    switch (action.type) {
      case SET_CURRENT_CATEGORY:
        return action.payload;
      case REMOVE_CURRENT_CATEGORY:
        return null;
      default:
        return prevState;
    }
  };

export default currentCategoryReducer;
