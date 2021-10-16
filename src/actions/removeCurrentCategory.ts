import {
  ActionCreator,
  RemoveCurrentCategoryAction
} from 'actions/declarations';

import { REMOVE_CURRENT_CATEGORY } from './types';

const setCurrentCategory: ActionCreator<RemoveCurrentCategoryAction> =
  (): RemoveCurrentCategoryAction => ({ type: REMOVE_CURRENT_CATEGORY });

export default setCurrentCategory;
