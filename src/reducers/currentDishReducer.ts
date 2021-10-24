import { Reducer } from 'redux';

import { NullableDish } from 'models';
import {
  SetCurrentDishAction,
  RemoveCurrentDishAction
} from 'actions';
import {
  SET_CURRENT_DISH,
  REMOVE_CURRENT_DISH
} from 'actions/types';

export type CurrentDishReducer =
  Reducer<NullableDish, SetCurrentDishAction | RemoveCurrentDishAction>;

const currentDishReducer: CurrentDishReducer =
  (prevState = null, action) => {
    switch (action.type) {
      case SET_CURRENT_DISH:
        return action.payload;
      case REMOVE_CURRENT_DISH:
        return null;
      default:
        return prevState;
    }
  };

export default currentDishReducer;
