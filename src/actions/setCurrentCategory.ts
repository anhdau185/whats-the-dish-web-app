import { Category } from 'models';

import { SET_CURRENT_CATEGORY } from './types';
import { Action } from 'redux';

export interface SetCurrentCategoryAction extends Action<'SET_CURRENT_CATEGORY'> {
  payload: Category;
}

const setCurrentCategory: (category: Category) => SetCurrentCategoryAction =
  category => ({
    type: SET_CURRENT_CATEGORY,
    payload: category
  });

export default setCurrentCategory;
