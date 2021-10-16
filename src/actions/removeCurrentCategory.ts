import { Action } from 'redux';

import { REMOVE_CURRENT_CATEGORY } from './types';

export type RemoveCurrentCategoryAction = Action<'REMOVE_CURRENT_CATEGORY'>;

const setCurrentCategory: () => RemoveCurrentCategoryAction =
  () => ({ type: REMOVE_CURRENT_CATEGORY });

export default setCurrentCategory;
