import { Action } from 'redux';

import { REMOVE_CURRENT_DISH } from './types';

export type RemoveCurrentDishAction = Action<'REMOVE_CURRENT_DISH'>;

const removeCurrentDish: () => RemoveCurrentDishAction =
  () => ({ type: REMOVE_CURRENT_DISH });

export default removeCurrentDish;
