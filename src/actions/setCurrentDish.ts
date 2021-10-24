import { Action } from 'redux';

import { Dish } from 'models';

import { SET_CURRENT_DISH } from './types';

export interface SetCurrentDishAction extends Action<'SET_CURRENT_DISH'> {
  payload: Dish;
}

const setCurrentDish: (dish: Dish) => SetCurrentDishAction =
  dish => ({
    type: SET_CURRENT_DISH,
    payload: dish
  });

export default setCurrentDish;
