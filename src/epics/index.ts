import { combineEpics } from 'redux-observable';

import pingPongEpic from './pingPongEpic';
import fetchDishesEpic from './fetchDishesEpic';
import fetchCategoriesEpic from './fetchCategoriesEpic';

const rootEpic = combineEpics(
  pingPongEpic,
  fetchDishesEpic,
  fetchCategoriesEpic
);

export default rootEpic;
