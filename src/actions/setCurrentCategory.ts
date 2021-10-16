import { CategoryModel } from 'models';
import {
  ActionCreator,
  SetCurrentCategoryAction
} from 'actions/declarations';

import { SET_CURRENT_CATEGORY } from './types';

const setCurrentCategory: ActionCreator<SetCurrentCategoryAction> =
  (category: CategoryModel): SetCurrentCategoryAction => ({
    type: SET_CURRENT_CATEGORY,
    payload: category
  });

export default setCurrentCategory;
