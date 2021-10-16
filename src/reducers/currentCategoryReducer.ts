import { Reducer } from 'redux';

import { NullableCategoryModel } from 'models';
import { CurrentCategoryAction } from 'actions/declarations';
import { SET_CURRENT_CATEGORY, REMOVE_CURRENT_CATEGORY } from 'actions/types';

const currentCategoryReducer: Reducer<NullableCategoryModel, CurrentCategoryAction> =
  (prevState = null, action: CurrentCategoryAction): NullableCategoryModel => {
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
